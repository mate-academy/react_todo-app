import { FC, useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const FooterButton: FC = () => {
  const { numberComplete, handleFocusInput, dispatch } =
    useContext(TodoContext);

  const clearCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETED_TODO' });
    handleFocusInput();
  };

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={numberComplete === 0}
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  );
};
