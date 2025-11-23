import React, { FC, useEffect, useRef, useState } from 'react';
import { useTodosActions } from '../../hooks/useTodosActions';
import { useTodos } from '../../hooks/useTodos';

export const TodoForm: FC = React.memo(function TodoForm() {
  const [title, setTitle] = useState('');

  const dispatch = useTodosActions();
  const todos = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    handleFocus();
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        ref={inputRef}
      />
    </form>
  );
});
