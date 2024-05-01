import { FC, useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const FooterButton: FC = () => {
  const { numberComplete, dispatch } = useContext(TodoContext);

  const clearCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETED_TODO' });
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
