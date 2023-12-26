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

  const [newTodo, setNewTodo] = useState(initialTodo);

  const plusTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      ...newTodo,
      id: todos.length + 1,
    });

    setNewTodo(initialTodo);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
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
          onChange={event => handleInputChange(event)}
        />
      </form>
    </header>
  );
};
