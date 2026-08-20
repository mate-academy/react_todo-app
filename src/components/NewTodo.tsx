import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useGlobalState } from '../context/Context';

export const NewTodo = () => {
  const { todos } = useGlobalState();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const newTodoInputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    dispatch({
      type: 'add',
      payload: {
        id: Date.now(),
        title: trimmed,
        completed: false,
      },
    });

    setTitle('');
  };

  useEffect(() => {
    newTodoInputRef.current?.focus();
  }, [todos]);

  // eslint-disable-next-line no-console
  console.log('render NewToDo');

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        ref={newTodoInputRef}
      />
    </form>
  );
};
