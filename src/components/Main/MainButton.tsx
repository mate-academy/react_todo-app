import { FC } from 'react';

interface IProps {
  id: string;
  deleteTodo: (id: string) => void;
}

export const MainButton: FC<IProps> = ({ id, deleteTodo }) => {
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
