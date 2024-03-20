import { useContext } from 'react';
import { TodoList } from './TodoList';
import { StateContext } from './TodoContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(StateContext);

  const allCompleted = todos.every(todo => todo.completed);
  const handleToggleAll = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
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
