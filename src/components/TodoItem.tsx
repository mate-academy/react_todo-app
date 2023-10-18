import {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../services/Types';
import { DispatchContext } from '../services/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && isEdited) {
      titleField.current.focus();
    }
  }, [isEdited]);

  const handleComplete = () => {
    dispatch({
      type: 'markCompleted',
      payload: { id },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: 'remove',
      payload: { id },
    });
  };

  const changeTitile = useCallback(() => {
    if (!newTitle.trim()) {
      handleRemove();

      return;
    }

    dispatch({
      type: 'edit',
      payload: {
        id,
        newTitle,
      },
    });
  }, [id, newTitle]);

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEdited(false);
    }

    if (event.key === 'Enter') {
      changeTitile();
      setIsEdited(false);
    }
  };

  const handleOnBlur = () => {
    setIsEdited(false);
    changeTitile();
  };

  return (
    <li className={classNames({ completed, editing: isEdited })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleComplete}
          checked={completed}
        />

        <label onDoubleClick={() => setIsEdited(true)}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
          onClick={handleRemove}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={titleField}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
      />
    </li>
  );
};
