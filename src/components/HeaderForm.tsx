import React, { useState, useEffect, useRef } from 'react';
import { useTodos } from '../Context/TodoContext';
import { Todo } from '../types/Todo';

export const HeaderForm = () => {
  const [value, setValue] = useState('');
  const { state, dispatch } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmedTitle = value.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });

    setValue('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.todos]);

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={e => setValue(e.target.value)}
        ref={inputRef}
        autoFocus
      />
    </form>
  );
};
