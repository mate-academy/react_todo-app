/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todo: Todo,
  removeTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  editTitle: (newTitle: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  removeTodo,
  changeStatus,
  editTitle,
}) => {
  const [clicked, setClicked] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const changeTodoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (changeTodoInput.current !== null) {
      changeTodoInput.current.focus();
    }
  }, [clicked]);

  const handleFocus = () => {
    if (changeTodoInput.current !== null) {
      changeTodoInput.current.focus();
    }
  };

  return (
    <li
      className={classNames({ completed: todo.completed }, { editing: clicked })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={todo.completed}
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
        ref={changeTodoInput}
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
});
