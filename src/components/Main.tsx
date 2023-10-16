import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const areAllTodosCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    const updatedTodos = todos.map(todo => ({ ...todo, completed: isChecked }));

    setTodos(updatedTodos);
  };

  return (!!todos.length && (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
        checked={areAllTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  )) || null;
};
