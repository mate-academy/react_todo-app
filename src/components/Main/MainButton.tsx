import { FC, useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';

interface IProps {
  id: string;
}

export const MainButton: FC<IProps> = ({ id }) => {
  const { handleFocusInput, dispatch } = useContext(TodoContext);

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    handleFocusInput();
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
