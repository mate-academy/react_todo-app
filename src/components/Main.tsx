import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../store/TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handleAllCompleted = () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleAllCompleted}
        checked={allCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
  );
};
