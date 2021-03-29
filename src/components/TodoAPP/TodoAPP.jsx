import React, { useState, useContext } from 'react';
import { TodosContext } from '../../utils/TodosContext';

export const TodoAPP = React.memo(() => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const addTodos = (todo) => {
    const arr = [...todos, todo];

    setTodos(arr);
  };

  const handleOnSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!title.trim()) {
        return;
      }

      addTodos({
        id: +new Date(),
        title,
        completed: false,
      });
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleOnSubmit}
        />
      </form>
    </header>
  );
});
