import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  togleStatus: (
    id: number,
    completed: boolean) => void;
  deleteTodo: (id: number) => void;
  changeInputText: (id: number, query: string) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  togleStatus,
  deleteTodo,
  changeInputText,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(title);

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      setQuery(event.target.value);
      if (!query) {
        deleteTodo(id);

        return;
      }

      changeInputText(id, query);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setQuery(title);
    }
  };

  const handleBlure = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEditing(false);

    if (!query) {
      deleteTodo(id);

      return;
    }

    setQuery(event.target.value);
    changeInputText(id, query);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => togleStatus(id, completed)}
          checked={completed}
        />
        <label
          onDoubleClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={title}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onBlur={handleBlure}
        onKeyDown={handleInputChange}
        placeholder="Empty todo will be deleted"
      />
    </li>
  );
};
