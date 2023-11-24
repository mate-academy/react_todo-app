/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import { Todo } from '../../types/Todo';
import { DispatchContext } from '../Provaider/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;

  const [editedTitle, setEditedTitle] = useState(title);
  const [isEdited, setIsEdited] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdited]);

  const handlerChageComleted = () => {
    dispatch({
      type: 'markCompleted',
      iD: id,
    });
  };

  const handlerRemoveTodo = () => {
    dispatch({
      type: 'removeTodo',
      iD: id,
    });
  };

  const handlerDoubleClick = () => {
    setIsEdited(true);
  };

  const handlerEditTodoTitle = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        iD: id,
        newTitle: editedTitle,
      });

      setIsEdited(false);
    } else {
      handlerRemoveTodo();
    }
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }

    if (event.key === 'Enter') {
      handlerEditTodoTitle();
    }
  };

  return (
    <li className={cn({
      completed: completed === true,
      editing: isEdited,
    })}
    >
      <div
        className="view"
        onDoubleClick={handlerDoubleClick}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handlerChageComleted}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handlerRemoveTodo}
        />
      </div>
      <input
        ref={titleRef}
        value={editedTitle}
        type="text"
        className="edit"
        onChange={(event) => setEditedTitle(event.target.value)}
        onKeyUp={handlerKeyUp}
        onBlur={handlerEditTodoTitle}
      />
    </li>
  );
};
