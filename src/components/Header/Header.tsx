import React, { useContext, useState } from 'react';

import { Todo } from '../../types/Todo';
import { Context } from '../ContextProvider/ContextProvider';

export const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
};

export const Header = () => {
  const { todos, addTodo } = useContext(Context);

  const [query, setQuery] = useState('');
  const [newTodo, setNewTodo] = useState(initialTodo);

  const addingTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      setQuery('');

      return;
    }

    let newId = 0;

    if (todos.length) {
      newId = todos[todos.length - 1].id + 1;
    }

    addTodo({
      ...newTodo,
      id: newId,
    });

    setQuery('');
    setNewTodo(initialTodo);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    setNewTodo({
      ...newTodo,
      title: value,
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addingTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
