import React, { useState } from 'react';
import { Main } from './Main';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const { todos, removeTodo, setTodos } = React.useContext(TodoContext);

  const handlerNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: +new Date(),
      title,
    };

    setTodos((currentTodo) => [...currentTodo, newTodo]);
    setTitle('');
  };

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handlerNewTodo}>
          <input
            onChange={handlerInput}
            value={title}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
      <Main todos={todos} removeTodo={removeTodo} />
    </>
  );
};
