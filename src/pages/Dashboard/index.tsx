import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type EditFoods = Omit<FoodProps, 'available'>

export function Dashboard(){
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<EditFoods>({} as EditFoods);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  useEffect(() => {
    async function fetchMyAPI() {
      await api.get('/foods').then(response => setFoods(response.data));
    }
    fetchMyAPI();
  },[]);

  async function handleAddFood(food: EditFoods) {
    try {
      await api.post('/foods', {
        ...food,
        available: true,
      }).then(response =>setFoods([...foods, response.data]) );
      ;

    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: EditFoods ) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {

    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: EditFoods) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {
          }
           { foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={() => handleDeleteFood(food.id)}
                handleEditFood={() => handleEditFood(food)}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
