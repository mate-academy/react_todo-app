/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  FC, KeyboardEvent, memo, useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../store/Store';
import { ActionTypes } from '../../types/ActionTypes';

type Props = {
  todo: Todo,
};

export const TodoItem: FC<Props> = memo(({ todo }) => {
  const { title, id, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleCompleted = () => {
    dispatch({
      type: ActionTypes.ToggleCompleted,
      payload: id,
    });
  };

  const deleteTodo = () => {
    dispatch({
      type: ActionTypes.DeleteTodo,
      payload: id,
    });
  };

  function cancel() {
    setEditedTitle(title);
    setIsEditing(false);
  }

  const save = () => {
    setEditedTitle((prevState) => prevState.trim());

    if (editedTitle === '') {
      deleteTodo();

      return;
    }

    if (editedTitle !== title) {
      dispatch({
        type: ActionTypes.SaveChanges,
        payload: { ...todo, title: editedTitle },
      });
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Escape') {
      cancel();
    }

    if (key === 'Enter') {
      save();
    }
  };

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={toggleCompleted}
        />

        <label onDoubleClick={() => setIsEditing(true)}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
        onBlur={cancel}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
