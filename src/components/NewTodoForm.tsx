import React, { FormEvent, RefObject, useState } from 'react';

import { useTodos } from '../context/TodosContext';

interface Props {
  inputRef: RefObject<HTMLInputElement>;
}

export const NewTodoForm: React.FC<Props> = ({ inputRef }) => {
  const [title, setTitle] = useState('');

  const { addTodo } = useTodos();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      inputRef.current?.focus();

      return;
    }

    addTodo(title);
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        autoFocus
      />
    </form>
  );
};
