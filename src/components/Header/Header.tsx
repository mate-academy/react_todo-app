import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useGlobalState } from '../../GlobalProvider';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const Header = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const areAllTodosCompleted = useMemo(() => {
    return todos.filter(todo => todo.completed).length === todos.length;
  }, [todos]);

  useEffect(() => inputRef.current?.focus(), [todos.length]);

  const handleToggleAllButtonClick = () => {
    let todosToChange = [];

    if (areAllTodosCompleted) {
      todosToChange = [...todos];
    } else {
      todosToChange = todos.filter(todo => !todo.completed);
    }

    todosToChange.forEach(todo => {
      const { id, title: todoTitle, completed } = todo;

      dispatch({
        type: 'updateTodo',
        payload: { id, title: todoTitle, completed: !completed },
      });
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      title: trimmedTitle,
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllButtonClick}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          autoFocus
        />
      </form>
    </header>
  );
};
