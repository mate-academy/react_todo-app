import { useContext, useEffect, useRef, useState } from 'react';
import type React from 'react';

import { TodoContext } from '../context/TodoContext';

let nextTodoId = 1;

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const context = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { state, dispatch } = context;

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    const highestId = Math.max(0, ...state.todos.map(todo => todo.id));

    if (nextTodoId <= highestId) {
      nextTodoId = highestId + 1;
    }

    dispatch({
      type: 'add',
      payload: {
        id: nextTodoId++,
        title: newTitle,
        completed: false,
      },
    });

    setTitle('');
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
