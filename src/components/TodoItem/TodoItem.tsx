/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../Store';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(todo.title);
  const [toggle, setToggle] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const dispatch = useContext(DispatchContext);

  const remove = (id: number) => dispatch({ type: 'delete', id });

  const handleKeyPress = (event: React.KeyboardEvent, id: number) => {
    if (event.key === 'Enter') {
      if (newValue.trim().length === 0) {
        remove(todo.id);

        return;
      }

      dispatch({ type: 'edit', id, value: newValue });
      setEdit(false);
    }

    if (event.key === 'Escape') {
      setNewValue(todo.title);
      setEdit(false);
    }
  };

  const handleOnBlur = (id: number) => {
    if (newValue.length === 0) {
      remove(todo.id);

      return;
    }

    dispatch({ type: 'edit', id, value: newValue });
    setEdit(false);
  };

  const handleToggle = (id: number) => {
    dispatch({ type: 'complete', id, value: !toggle });
    setToggle(!toggle);
  };

  return (
    <li
      onDoubleClick={() => setEdit(true)}
      className={cn({
        completed: todo.completed,
        editing: edit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => remove(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newValue}
        ref={inputRef}
        onChange={event => setNewValue(event.target.value)}
        onKeyUp={event => handleKeyPress(event, todo.id)}
        onBlur={() => handleOnBlur(todo.id)}
      />
    </li>
  );
};
