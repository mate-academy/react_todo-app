import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const ToDoForm: React.FC<Props> = ({ onSubmit, inputRef }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
      userId: 1,
    };

    onSubmit(newTodo);
    setTitle('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={handleTitleChange}
        value={title}
        autoFocus
      />
    </form>
  );
};
