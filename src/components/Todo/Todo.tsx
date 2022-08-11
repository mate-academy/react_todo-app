/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { TodoType } from '../../types/todoType';

type Props = {
  todo: TodoType,
  removeTask: (value: number) => void;
  toggleTask: (value: number) => void;
  onEditTitle: (todo: TodoType) => void,
};

export const Todo: React.FC<Props> = ({
  todo,
  removeTask,
  toggleTask,
  onEditTitle,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const modifyTodo = () => {
    if (!value) {
      setValue(title);
      setIsEditing(false);

      return;
    }

    const modifiedTodo = {
      ...todo,
      title: value,
    };

    onEditTitle(modifiedTodo);
    setIsEditing(false);
  };

  const checkPressedButton = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const undoChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setValue(title);
      setIsEditing(false);
    }
  };

  return (
    <>
      <li
        className={classNames(
          {
            completed,
          },
        )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={() => toggleTask(id)}
          />
          <label onDoubleClick={() => setIsEditing(true)}>
            {isEditing
              ? (
                <input
                  type="text"
                  className={classNames({ editing: isEditing })}
                  value={value}
                  onChange={changeTitle}
                  onBlur={modifyTodo}
                  onKeyPress={checkPressedButton}
                  onKeyDown={undoChanges}
                  ref={input => input && input.focus()}
                />
              )
              : <p>{title}</p>}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => removeTask(id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    </>
  );
};
