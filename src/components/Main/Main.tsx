import { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import './style.css';
import { DispatchContext, TodosContext } from '../GlobalStateProvider';
import { AllActions } from '../../types/Action';

export const Main: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const handleToggleClick = () => {
    dispatch({ type: AllActions.CompleteAll });
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={handleToggleClick}
            checked={todos.every(todo => todo.completed === true)}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <TodoList />
    </section>
  );
};
