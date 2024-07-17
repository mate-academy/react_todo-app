import React, { FormEvent, useContext, useRef } from 'react';
import { DispatchContext, StateContext } from './StateContext';
import classNames from 'classnames';

export const ToDoHeader = () => {
  const { toDoTitle, todos, focusOnTodo } = useContext(StateContext);
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
      dispatch({
        type: 'WRITE_NEW_TITLE',
        newTitle: '',
      });
    }
  };

  if (focusOnTodo) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  const allTodosAreCompleted =
    todos.filter(todo => todo.completed).length === todos.length;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
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

      {/* Add a todo on form submit */}
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
              type: 'FOCUS_ON_TODO',
            });
          }}
          onBlur={() => {
            dispatch({
              type: 'FOCUS_ON_TODO',
            });
          }}
          autoFocus={focusOnTodo}
        />
      </form>
    </header>
  );
};
