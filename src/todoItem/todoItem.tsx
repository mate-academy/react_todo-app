/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todoType';
import { TodoContext } from '../todoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const activeTodo = todo;
  const [active, setActive] = useState(false);
  const { deleteTodo, setItemLeft, itemLeft } = useContext(TodoContext);
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(activeTodo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckbox = () => {
    if (!active) {
      activeTodo.completed = true;
      setActive(true);
      setItemLeft(itemLeft - 1);
    } else {
      activeTodo.completed = false;
      setActive(false);
      setItemLeft(itemLeft + 1);
    }
  };

  const isChecked = activeTodo.completed;

  const handleDoubleClick = () => {
    setEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(event.target.value);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!titleEdit.length) {
        deleteTodo(activeTodo.id);
      }

      activeTodo.title = titleEdit;
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setEditing(false);
      setTitleEdit(activeTodo.title);
    }
  };

  return (
    <li className={classNames({
      completed: activeTodo.completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={handleCheckbox}
          checked={isChecked}
          ref={inputRef}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handleDoubleClick}
        >
          {activeTodo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(activeTodo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={titleEdit}
        onChange={handleEdit}
        onKeyUp={handleKey}
        onBlur={() => {
          setEditing(false);
          activeTodo.title = titleEdit;
        }}
      />
    </li>
  );
};
