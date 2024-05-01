import { FC, useContext } from 'react';
import { TodoDispatch } from '../../Context/TodoContext';

interface IProps {
  id: string;
}

export const MainButton: FC<IProps> = ({ id }) => {
  const dispatch = useContext(TodoDispatch);

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_TODO', payload: id });
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
