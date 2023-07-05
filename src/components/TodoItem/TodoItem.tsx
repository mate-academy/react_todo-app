/* eslint-disable jsx-a11y/control-has-associated-label */

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (todoId: number) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const { id, completed, title } = todo;
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [input, setInput] = useState(title);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement.current?.focus();
  }, [isBeingEdited]);

  const handleCancelUpdate = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Escape') {
      setInput(title);
      setIsBeingEdited(false);
    }
  };

  const handleTitleUpdate = () => {
    setIsBeingEdited(false);

    const trimmedInput = input.trim();

    if (trimmedInput === title) {
      return;
    }

    if (!input) {
      deleteTodo(id);

      return;
    }

    updateTodo(id, { title: trimmedInput });
  };

  return (
    <li
      className={classNames({
        editing: isBeingEdited,
        completed,
      })}
    >
      {isBeingEdited
        ? (
          <form onSubmit={handleTitleUpdate}>
            <input
              type="text"
              className="edit"
              placeholder="Empty todo will be deleted"
              ref={inputElement}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              onBlur={handleTitleUpdate}
              onKeyUp={handleCancelUpdate}
            />
          </form>
        ) : (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={completed}
              onChange={() => {
                updateTodo(id, { completed: !completed });
              }}
            />

            <label
              onDoubleClick={() => {
                setIsBeingEdited(true);
              }}
            >
              {title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            />
          </div>
        )}
    </li>
  );
};
