import { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import './style.css';
import { AllActions } from '../../types/Action';
import { GlobalContextController } from '../GlobalStateProvider';

export const Main: React.FC = () => {
  const { dispatch, todos } = useContext(GlobalContextController);
  const handleToggleClick = () => {
    dispatch({ type: AllActions.CompleteAll });
  };

  return todos.length > 0 ? (
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
  ) : <></>;
};
