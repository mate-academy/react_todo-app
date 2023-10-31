import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../contexts/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleSabmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      const newTodo: Todo = {
        id: +(new Date()),
        title,
        completed: false,
      };

      setTitle('');

      setTodos([...todos, newTodo]);
    }
  };

  const handleSetTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSabmit}>
        <input
          type="text"
          data-cy="createTodo"
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleSetTitle}
        />
      </form>
    </header>
  );
};
