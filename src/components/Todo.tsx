import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { PropsTodo, Actions, Todo } from '../types';
import { TodosContext } from '../Store';

type Event =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement, Element>;

export const TodoItem: React.FC<PropsTodo> = ({ id, title, status }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(title);
  const { todos, setTodos } = useContext(TodosContext);

  function handleClick(action: string) {
    let newTodos: Todo[] = [...todos];

    switch (action) {
      case Actions.delete:
        newTodos = todos.filter((item: Todo) => item.id !== id);
        break;
      case Actions.updateToDone:
        newTodos = todos.map((item: Todo) => {
          return item.id === id ? { ...item, completed: true } : item;
        });
        break;
      case Actions.updateToNotDone:
        newTodos = todos.map((item: Todo) => {
          return item.id === id ? { ...item, completed: false } : item;
        });
        break;
    }

    setTodos(newTodos);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    let newList: Todo[] = [...todos];

    if (query) {
      newList = todos.map((todo: Todo) => {
        return todo.id === id ? { ...todo, title: query.trim() } : todo;
      });
      setQuery(query);
    } else {
      newList = todos.filter((todo: Todo) => {
        return todo.id !== id;
      });

      setQuery(title);
    }

    setTodos(newList);
    setIsFocused(false);
  }

  function preventSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsFocused(false);
      setQuery(title);
    }
  }

  return (
    <div data-cy="Todo" className={classNames('todo', { completed: status })}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={status === true ? true : false}
          onClick={() =>
            handleClick(
              !status ? Actions.updateToDone : Actions.updateToNotDone,
            )
          }
        />
      </label>

      {!isFocused && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsFocused(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleClick(Actions.delete)}
          >
            ×
          </button>
        </>
      )}

      {isFocused && (
        <form onSubmit={event => handleSubmit(event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            autoFocus
            onKeyUp={event => {
              preventSubmit(event);
            }}
            onChange={event => {
              setQuery(event.target.value.trimStart());
            }}
            onBlur={event => handleSubmit(event)}
          />
        </form>
      )}
    </div>
  );
};
