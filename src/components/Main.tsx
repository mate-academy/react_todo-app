import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoContext } from '../TodoContext';

export const Main: React.FC = () => {
  const { todos, setTodos, setVisibleTodos } = useContext(TodoContext);
  const [isToggleAll, setIsToggleAll] = useState(false);

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isToggleAll,
    }));

    setTodos(updatedTodos);
    setVisibleTodos(updatedTodos);
    setIsToggleAll(!isToggleAll);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        onChange={handleToggleAll}
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
