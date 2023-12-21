import React, { useCallback, useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { todos, setTodos, setIsToggleCheckedAll } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleSubmit = useCallback((
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setIsToggleCheckedAll(false);
  }, [setIsToggleCheckedAll, setTodos, title, todos]);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
