import React, { useContext, useState } from 'react';
import { Input } from '../UI/Input';

import { Todo } from '../../types/Todo';
import { Context } from '../../services/context/ContextProvider';

export const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
};

export const Header = () => {
  const { todos, addTodo } = useContext(Context);

  const [query, setQuery] = useState('');
  const [newTodo, setNewTodo] = useState(initialTodo);

  const plusTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    setQuery(event.target.value);

    setNewTodo({
      ...newTodo,
      title: query,
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={plusTodo}>
        <Input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => handleInputChange(event)}
        />
      </form>
    </header>
  );
};
