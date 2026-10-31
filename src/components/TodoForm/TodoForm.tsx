import React, { useState, useRef, useEffect } from 'react';
import { useTodos, useTodosDispatch } from '../../store/TodosStore';

export const TodoForm: React.FC = () => {
  const todos = useTodos();
  const previousCount = useRef(todos.length);
  const [title, setTitle] = useState('');

  const dispatch = useTodosDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    dispatch({
      type: 'addTodo',
      payload: newTodo,
    });

    setTitle('');
  };

  useEffect(() => {
    if (todos.length < previousCount.current) {
      inputRef.current?.focus();
    }

    previousCount.current = todos.length;
  }, [todos.length]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={inputRef}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        autoFocus
      />
    </form>
  );
};
