import { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleChangeToggle = () => {
    const completedValue = todos.some(todo => !todo.completed);

    const updatedTodos = todos.map(todo => {
      return ({
        ...todo,
        completed: completedValue,
      });
    });

    setTodos(updatedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleChangeToggle}
      />

      {todos.length && (
        <label htmlFor="toggle-all">Mark all as complete</label>
      )}

      <TodoList data-cy="todoList" />
    </section>
  );
};
