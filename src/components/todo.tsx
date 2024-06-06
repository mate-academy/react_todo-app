import React, { useState } from 'react';
import classNames from 'classnames';
import { PropsTodo, Actions } from '../types';

type Event =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement, Element>;

export const TodoItem: React.FC<PropsTodo> = ({
  id,
  title,
  status,
  todos,
  setTodos,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(title);

  function handleClick(action: string) {
    if (action === Actions.delete) {
      const newTodos = todos.filter(item => item.id !== id);

      setTodos(newTodos);
    }

    if (action === Actions.updateToDone) {
      const newTodos = todos.map(item => {
        return item.id === id ? { ...item, completed: true } : item;
      });

      setTodos(newTodos);
    }

    if (action === Actions.updateToNotDone) {
      const newTodos = todos.map(item => {
        return item.id === id ? { ...item, completed: false } : item;
      });

      setTodos(newTodos);
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (query) {
      const newList = todos.map(todo => {
        return todo.id === id ? { ...todo, title: query.trim() } : todo;
      });

      setTodos(newList);
      setIsFocused(false);
      setQuery(query);
    } else {
      const newList = todos.filter(todo => {
        return todo.id !== id;
      });

      setTodos(newList);
      setIsFocused(false);
      setQuery(title);
    }
  }

  function preventSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsFocused(false);
      setQuery(title);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: status === true })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={status === true ? true : false}
          onClick={() => {
            return !status
              ? handleClick(Actions.updateToDone)
              : handleClick(Actions.updateToNotDone);
          }}
        />
      </label>

      {!isFocused && (
        <React.Fragment>
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
        </React.Fragment>
      )}

      {isFocused && (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};

// {
//   /* This todo is being edited */
// }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
{
  /* <form>
  <input
    data-cy="TodoTitleField"
    type="text"
    className="todo__title-field"
    placeholder="Empty todo will be deleted"
    value="Todo is being edited now"
  />
</form>; */
}
// </div>;

// {
//   /* This todo is in loading state */
// }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>
// </div>;
