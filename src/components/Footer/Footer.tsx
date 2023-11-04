import { useContext } from 'react';
import './style.css';
import { DispatchContext, TodosContext } from '../GlobalStateProvider';
import { AllActions } from '../../types/Action';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const handleRemoveCompletedClick = () => {
    dispatch({ type: AllActions.RemoveCompleted });
  };

  const tasksLeft = todos.filter(todo => todo.completed === false).length;

  return todos.length > 0 ? (
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
  )
    : <></>;
};
