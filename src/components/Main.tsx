import { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodoContext } from '../contexts/TodoContext';

export const Main = () => {
  const { todos, toggleAll } = useContext(TodoContext);

  const hangeToggleAll = () => {
    toggleAll(!todos.every(todo => todo.completed));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={hangeToggleAll}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
