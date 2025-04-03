import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { Todo } from '../../types/Todo';

type Props = {};

export const NewTodoForm: React.FC<Props> = () => {
  // console.log('render newTodo');
  const [query, setQuery] = useState('');
  const { handleAddTodo, todos } = useContext(TodoContext);

  const focusInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusInput.current?.focus();
  }, [todos]);

  const createTodo = (
    event: React.FormEvent<HTMLFormElement>,
    todoTitle: string,
  ) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    handleAddTodo(newTodo);
    setQuery('');
  };

  return (
    <form
      onSubmit={event => {
        createTodo(event, query);
      }}
    >
      <input
        ref={focusInput}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </form>
  );
};
