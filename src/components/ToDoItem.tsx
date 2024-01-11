import React, { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/ToDoContext';

type Props = {
  todo: Todo;
};

enum Keys {
  Enter = 'Enter',
  Escape = 'Escape',
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;
  const { toggleTodo, deleteTodo, changeTitle } = useContext(TodosContext);

  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setEditing(true);
    if (inputRef.current) {
      inputRef.current.value = title;
    }
  };

  const completeEditing = () => {
    if (!inputRef.current) {
      return;
    }

    if (inputRef.current.value.trim()) {
      changeTitle(id, inputRef.current.value);
    } else {
      deleteTodo(id);
    }

    setEditing(false);
  };

  const handleKeys = (event: React.KeyboardEvent) => {
    if (event.key === Keys.Enter) {
      completeEditing();
    } else if (event.key === Keys.Escape) {
      setEditing(false);
    }
  };

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${id}`}
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <label
          htmlFor={`toggle-${id}`}
          onDoubleClick={handleEditing}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        onKeyDown={handleKeys}
        onBlur={() => setEditing(false)}
      />
    </li>
  );
};
