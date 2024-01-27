/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from './Store';
import { Todo } from '../types/todo';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasSpaces, setHasSpaces] = useState(false);

  const { todos, setTodos, setIsCompletedAll } = useContext(TodosContext);

  const reset = () => {
    setIsEmpty(false);
    setHasSpaces(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ' ') {
      setIsEmpty(false);
      setHasSpaces(true);

      return;
    }

    reset();
    setTitle(event.target.value);
    setIsCompletedAll(null);
  };

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsEmpty(true);
      setHasSpaces(false);

      return;
    }

    addTodo({
      id: +new Date(),
      title: title.trimEnd(),
      complete: false,
    });

    setTitle('');
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitle}
          onBlur={() => reset()}
        />
      </form>

      <div className={cn('warning-empty', { show: isEmpty })}>
        Please fill out this field
      </div>

      <div className={cn('warning-spaces', { show: hasSpaces })}>
        Todo cannot start with spaces
      </div>
    </>
  );
};
