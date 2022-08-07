import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo
  updateTodo: (id: number, value: string | boolean) => void
  clear: (id: number) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  updateTodo,
  clear,
}) => {
  const [query, setQuery] = useState(todo.title);
  const [prevQuery, setprevQuery] = useState(query);
  const [onEdit, setOnEdit] = useState(false);

  const applyTitle = () => {
    setprevQuery(query);
    updateTodo(todo.id, query);
  };

  const editTitle = (key: string) => {
    if (key === 'Enter') {
      applyTitle();
      setOnEdit(false);
    }

    if (key === 'Escape') {
      setQuery(prevQuery);
      setOnEdit(false);
    }
  };

  return (
    <>
      <li
        className={classNames({ completed: todo.completed, editing: onEdit })}
        id="test"
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => {
              updateTodo(todo.id, !todo.completed);
            }}
          />
          <label
            onDoubleClick={() => setOnEdit(!onEdit)}
          >
            {prevQuery}
          </label>
          <button
            aria-label="#toggle-view"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => clear(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event => editTitle(event.key))}
          onBlur={(event) => {
            event.preventDefault();
            applyTitle();
          }}
        />
      </li>
    </>
  );
};
