/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../managment/Contextes';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItems: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;

  const [edietTitle, setEdietTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdit]);

  const handalChekTodo = () => {
    dispatch({
      type: 'marcToComplited',
      id,
    });
  };

  const handelEditTodo = () => {
    dispatch({
      type: 'editTitle',
      newTitle: edietTitle,
      id,
    });
    setIsEdit(false);
  };

  const handelRemove = () => {
    dispatch({
      type: 'removeToComplited',
    });
  };

  return (
    <li className={cn({
      completed: completed === true,
      editing: isEdit,
    })}
    >
      <div
        className="view"
        onDoubleClick={() => setIsEdit(false)}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={handalChekTodo}
          onChange={handelRemove}
        />
        <label htmlFor="toggle-view">{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        onChange={e => setEdietTitle(e.target.value)}
        ref={titleRef}
        className="edit"
        onBlur={handelEditTodo}
      />
    </li>
  );
};
