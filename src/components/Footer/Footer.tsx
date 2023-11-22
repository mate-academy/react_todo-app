import { useContext } from 'react';
import './style.css';
import { AllActions } from '../../types/Action';
import { TodosFilter } from '../TodosFilter';
import { GlobalContextController } from '../GlobalStateProvider';

export const Footer: React.FC = () => {
  const { todos, dispatch } = useContext(GlobalContextController);
  const handleRemoveCompletedClick = () => {
    dispatch({ type: AllActions.RemoveCompleted });
  };

  const tasksLeft = todos.filter(todo => todo.completed === false).length;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${tasksLeft} ${tasksLeft === 1 ? 'item' : 'items'} left`}
      </span>

      <TodosFilter />

      {
        todos.find(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleRemoveCompletedClick}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
