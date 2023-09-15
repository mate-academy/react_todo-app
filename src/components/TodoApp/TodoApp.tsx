import React, { useState, useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';
import { Todo } from '../../types/Todo';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      title: query,
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: ActionType.Add, payload: newTodo });
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
