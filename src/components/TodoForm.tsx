import React, { useCallback, useContext, useState } from 'react';
import { TodosContext } from './Store';
import { Todo } from '../types/todo';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState('');

  // const { addTodo } = useContext(TodosContext);
  const { todos, setTodos } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo({
      id: +new Date(),
      title,
      complete: false,
    });

    setTitle('');
  };

  return (
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
      />
    </form>
  );
};
