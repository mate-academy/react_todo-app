import { FC, useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const FooterButton: FC = () => {
  const { numberComplete, deleteCompletedTodos } = useContext(TodoContext);

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={numberComplete === 0}
      onClick={deleteCompletedTodos}
    >
      Clear completed
    </button>
  );
};
