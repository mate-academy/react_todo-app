import { useContext } from 'react';
import { TodoList } from '../TodoList';
import { DispatchContext, StateContext } from '../management/TodoContext';

export const Main: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const allCompl = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({
      type: 'toggleCompleted',
      payload: !allCompl,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompl}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
