import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (movie: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const defaultTodo: Todo = {
    id: +new Date(),
    title: '',
    isCompleted: false,
  };

  const [todo, setTodo] = useState(defaultTodo);

  const handeInputChange = (
    // eslint-disable-next-line max-len
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(todo);
    setTodo(defaultTodo);
  };

  return (
    <form
      className="new-todo"
      onSubmit={handleFormSubmit}
    >

      <input
        name="title"
        value={todo.title}
        type="text"
        className="new-todo"
        data-cy="createTodo"
        onChange={handeInputChange}
        placeholder="What needs to be done?"
        required
      />
    </form>

  );
};
