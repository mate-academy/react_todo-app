import React, { FormEvent, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const Header = React.memo<Props>(({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>('');

  const handleSabmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSabmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => handleChange(event.target.value)}
        />
      </form>
    </header>
  );
});
