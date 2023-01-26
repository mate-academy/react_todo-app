import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const NewTodoField: React.FC<Props> = ({
  setItems,
}) => {
  const [value, setValue] = useState('');
  const newTitleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTitleInput.current) {
      newTitleInput.current.focus();
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) {
      return;
    }

    setItems((currentTodos) => {
      const newTodo: Todo = {
        id: +new Date(),
        title: value,
        completed: false,
      };

      return [...currentTodos, newTodo];
    });
    setValue('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setValue(e.currentTarget.value);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        ref={newTitleInput}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
      />
    </form>
  );
};
