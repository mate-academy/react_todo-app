import { useContext } from 'react';
import { DispatchContext, StateContext } from '../contexts/TodoContext';
import { TodoList } from './TodoList';

export const Main: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({
      type: 'toggleCompleted',
      payload: !allCompleted,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompleted}
        onChange={handleToggleAll}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
