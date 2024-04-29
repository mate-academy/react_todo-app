import { FC, useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';

interface IProps {
  id: string;
}

export const MainButton: FC<IProps> = ({ id }) => {
  const { deleteTodo } = useContext(TodoContext);

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={handleDeleteClick}
    >
      ×
    </button>
  );
};
