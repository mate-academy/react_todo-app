/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from './Store';
import { Todo } from '../types/todo';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const { todos, setTodos } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setError('Please add a text');

      return;
    }

    addTodo({
      id: +new Date(),
      title: title.trim(),
      complete: false,
    });

    setTitle('');
    setError('');
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        className={cn('new-todo', { error })}
        placeholder={error || 'What needs to be done?'}
        value={title}
        onChange={handleTitle}
      />
    </form>
  );
};
