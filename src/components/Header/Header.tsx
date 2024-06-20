import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { DispatchContext, TodosContext } from '../StoreTodos/StoreTodos';
import { getTodosStatistic } from '../../utils/getTodosStatistic';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const addTodo = (todo: Todo) => {
    dispatch({ type: 'add', payload: todo });
  };

  const updateTodo = (todo: Todo) => {
    dispatch({ type: 'update', payload: todo });
  };

  const {
    all: allTodos,
    active: activeTodos,
    completed: completedTodos,
  } = getTodosStatistic(todos);

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo({
      id: +new Date(),
      completed: false,
      title: trimmedTitle,
    });

    setTitle('');
  };

  const handleToggleAllClick = () => {
    let updatedTodos = [...todos];

    if (allTodos !== activeTodos && activeTodos) {
      updatedTodos = todos.filter(todo => !todo.completed);
    }

    updatedTodos.forEach(todo => {
      updateTodo({
        ...todo,
        completed: !todo.completed,
      });
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {allTodos > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodos === completedTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllClick}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
