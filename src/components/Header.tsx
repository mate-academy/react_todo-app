import React, { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  onSubmit: (todo: Todo) => void,
};

export const Header: React.FC<Props> = ({ todos, setTodos, onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleOnSubmit = () => {
    if (query.trim() === '') {
      return;
    }

    onSubmit({
      id: +new Date(),
      title: query,
      completed: false,
    });
    setQuery('');
  };

  const isAllCompleted = todos.every(todo => todo.completed);

  const allTodosCompleted = useCallback(() => {
    const todoToUpdate = isAllCompleted
      ? todos.filter(todo => todo.completed)
      : todos.filter(todo => !todo.completed);

    const updatedTodos = todoToUpdate.map(todo => (
      { ...todo, completed: !todo.completed }
    ));

    setTodos(todos.map(todo => {
      const updatedTodo = updatedTodos
        .find(task => task.id === todo.id);

      return updatedTodo || todo;
    }));
  }, [todos]);

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleOnSubmit} onBlur={handleOnSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      {todos.length > 0 && (
        <TodoFilter
          isAllCompleted={isAllCompleted}
          allTodosCompleted={allTodosCompleted}
        />
      )}
    </header>
  );
};
