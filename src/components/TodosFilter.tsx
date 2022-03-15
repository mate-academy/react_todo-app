import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTodos } from './hooks/useTodos';

export const TodosFilter: React.FC = () => {
  const filters = ['All', 'Active', 'Completed'];
  const [status, setStatus] = useState('All');

  const content = useTodos();
  const todos = content?.todos;
  const setFilteredTodos = content?.setFilteredTodos;

  const filterTodos = (value: string) => {
    if (todos && setFilteredTodos) {
      switch (value) {
        case 'Completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;

        case 'Active':
          setFilteredTodos(todos.filter(todo => todo.completed !== true));
          break;

        default:
          setFilteredTodos(todos);
      }
    }
  };

  useEffect(() => {
    filterTodos(status);
  }, [status]);

  useEffect(() => {
    setStatus('All');
  }, [todos]);

  return (
    <div className="todo-footer__filter if-flex ">
      {filters.map(filter => (
        <button
          key={filter}
          type="button"
          onClick={() => setStatus(filter)}
          className={classNames(
            'button is-small is-success is-outlined',
            { 'is-focused': status === filter },
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
