import React, { useState, useContext } from 'react';
import { TodosContext } from '../../utils/TodosContext';

export const TodoApp = React.memo(() => {
  const [title, setTitle] = useState('');
  const { setTodos } = useContext(TodosContext);

  const addTodo = (todo) => {
    setTodos(prev => [...prev, todo]);
  };

  const handleOnSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!title.trim()) {
        return;
      }

      addTodo({
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
