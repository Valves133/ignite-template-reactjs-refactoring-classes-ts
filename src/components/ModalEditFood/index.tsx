import { FiCheckSquare } from 'react-icons/fi';
import { useRef } from 'react';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalProps {
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodProps) => Promise<void>;
  editingFood: Omit<FoodProps, 'available'>;
  isOpen:boolean;
}

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export function ModalEditFood({ setIsOpen, handleUpdateFood, isOpen, editingFood }: ModalProps) {
  const formRef = useRef(null);

  async function handleSubmit(data: FoodProps) {
    handleUpdateFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
