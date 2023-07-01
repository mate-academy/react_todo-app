import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
};

export const Header: React.FC<Props> = ({
  todos, setTodos,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTitle.trim()) {
      const newTodo: Todo = {
        id: +new Date(),
        title: newTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTitle('');
    }
  };

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          ref={input}
        />
      </form>
    </header>
  );
};
