import React, { FormEvent, useContext, useRef } from 'react';
import { DispatchContext, StateContext } from './StateContext';
import classNames from 'classnames';

export const ToDoHeader = () => {
  const { toDoTitle, todos, focusOnInput } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedToDoTitle = toDoTitle.trim();

    if (!trimmedToDoTitle) {
      return;
    } else {
      dispatch({
        type: 'ADD_TODO',
      });
    }
  };

  if (focusOnInput) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  const allTodosAreCompleted =
    todos.filter(todo => todo.completed).length === todos.length;

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosAreCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({
              type: 'TOGGLE_ALL_TODOS',
            });
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={toDoTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: 'WRITE_NEW_TITLE',
              newTitle: event.target.value.toString(),
            });
          }}
          onClick={() => {
            dispatch({
              type: 'FOCUS_ON_INPUT',
            });
          }}
          onBlur={() => {
            dispatch({
              type: 'FOCUS_ON_INPUT',
            });
          }}
        />
      </form>
    </header>
  );
};
