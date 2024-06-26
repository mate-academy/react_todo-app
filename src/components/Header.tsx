import React, { FormEventHandler, useContext, useRef } from 'react';
import '../styles/todoapp.scss';
import { Dispatch, StateContext } from './ToDoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  // eslint-disable-next-line prettier/prettier
  const {toDoTitle, todos, focusOnTodo
  } = useContext(StateContext);
  const dispatch = useContext(Dispatch);

  const handleInputSubmit: FormEventHandler = event => {
    event.preventDefault();

    if (toDoTitle.trim()) {
      dispatch({ type: 'ADD TODO' });
      dispatch({ type: 'ADD NEW TITLE', newTitle: '' });
    }
  };

  const allTodosCompleted = todos.filter(todo => todo.completed);
  const completedTodosLength = todos.length === allTodosCompleted.length;

  const inputRef = useRef<HTMLInputElement>(null);

  if (focusOnTodo) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedTodosLength,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({
              type: 'TOGGLE TODOS',
            });
          }}
        />
      )}

      <form onSubmit={handleInputSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={toDoTitle}
          ref={inputRef}
          onClick={() => {
            dispatch({
              type: 'FOCUS NEW TODO',
            });
          }}
          onBlur={() => {
            dispatch({
              type: 'FOCUS NEW TODO',
            });
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: 'ADD NEW TITLE',
              newTitle: event.target.value.toString(),
            });
          }}
        />
      </form>
    </header>
  );
};
