import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../contexts/TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isChecked = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const isAllCompleted = todos.every(todo => todo.completed);
    const modifiedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(modifiedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
