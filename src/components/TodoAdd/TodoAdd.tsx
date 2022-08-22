import React, { useState } from 'react';
import { Todo } from '../../todo';

interface Props {
  todos: Todo[]
  onSetTodos: (newValue: Todo[]) => void
}

export const TodoAdd = React.memo<Props>(({ todos, onSetTodos }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      onSetTodos([...todos, {
        id: Number(new Date()),
        title,
        completed: false,
      }]);
    }

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </form>
  );
});
