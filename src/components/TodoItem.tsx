/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { TodoContextDispatch } from '../Services/TodosContext';
import { ActionTypeEnum, Todo } from '../Services/Types';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const dispatch = useContext(TodoContextDispatch);
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (input.current && isEditing) {
      input.current.focus();
    }
  }, [isEditing]);

  const handleComplete = () => {
    dispatch({
      type: ActionTypeEnum.Complete,
      payload: {
        todoId: id,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: ActionTypeEnum.Delete,
      payload: {
        todoId: id,
      },
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const save = useCallback(() => {
    if (!newTitle.trim()) {
      handleDelete();

      return;
    }

    dispatch({
      type: ActionTypeEnum.Edit,
      payload: {
        todoId: id,
        newTitle,
      },
    });
  }, [newTitle, id]);

  const handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      save();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (title === newTitle) {
      return;
    }

    save();
  };

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleComplete}
          checked={completed}
        />

        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />

      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={input}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={handleEditKeyUp}
        onBlur={handleBlur}
      />
    </li>
  );
};
