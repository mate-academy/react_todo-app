/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  todo: Todo,
  removeTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  editTitle: (newTitle: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  removeTodo,
  changeStatus,
  editTitle,
}) => {
  const [clicked, setClicked] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInput.current !== null) {
      searchInput.current.focus();
    }
  }, [clicked]);

  const handleFocus = () => {
    if (searchInput.current !== null) {
      searchInput.current.focus();
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({ completed: todo.completed }, { editing: clicked })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => changeStatus(todo.id)}
        />
        <label
          onDoubleClick={() => {
            handleFocus();
            setClicked(true);
          }}
        >
          {todo.title ? todo.title : `${removeTodo(todo.id)}`}
        </label>
        <button type="button" className="destroy" onClick={() => removeTodo(todo.id)} />
      </div>
      <input
        type="text"
        ref={searchInput}
        className="edit"
        value={tempTitle}
        onChange={event => setTempTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            editTitle(tempTitle, todo.id);
            setClicked(false);
          }

          if (event.key === 'Escape') {
            setClicked(false);
            setTempTitle(todo.title);
          }
        }}
        onBlur={() => setClicked(false)}
      />
    </li>
  );
};
