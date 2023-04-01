/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../../context/TodoProvider';
import { Todo } from '../../types/Todo/Todo';

type Props = {
  todo: Todo,
  updateId: number | null,
  updateIdHandler: (value: number | null) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  updateId,
  updateIdHandler,
}) => {
  const {
    checkCompleted,
    deleteTodo,
    changeTitle,
    todosOriginal,
    statusTodo,
    statusTodosHandler,
  } = useTodo();

  const { id, title, completed } = todo;

  const [tittleText, setTitleText] = useState(title);

  const changeTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeTitle(id, tittleText);
      updateIdHandler(null);
    } else if (event.key === 'Escape') {
      updateIdHandler(null);
      setTitleText(title);
    }
  };

  const ref = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    statusTodosHandler(statusTodo);
  }, [todosOriginal]);

  useEffect(() => {
    handleFocus();
  });

  return (
    <li
      className={classNames({ completed, editing: updateId === id })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => {
            checkCompleted(todo);
          }}
          checked={completed}
        />
        <label
          onDoubleClick={() => {
            updateIdHandler(id);
            handleFocus();
          }}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>

      {(updateId === id) && (
        <input
          type="text"
          ref={ref}
          className="edit"
          value={tittleText}
          onChange={(event) => setTitleText(event.target.value)}
          onKeyUp={(event) => changeTitleHandler(event)}
          onBlur={(event) => {
            updateIdHandler(null);
            changeTitle(id, event.target.value);
          }}
        />
      )}
    </li>
  );
};
