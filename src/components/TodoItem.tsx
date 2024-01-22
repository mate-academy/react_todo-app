import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handelRemoveTodo = () => {
    dispatch({
      type: 'removeTodo',
      payload: id,
    });
  };

  const handleChangeTodo = () => {
    dispatch({
      type: 'changeTodo',
      payload: id,
    });
  };

  const handlerDoubleClick = () => {
    setIsEditing(true);
  };

  const handelNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handelEditTodo = () => {
    if (newTitle.trim()) {
      dispatch({
        type: 'editTodo',
        payload: {
          id,
          title: newTitle,
          completed,
        },
      });
      setIsEditing(false);
    } else {
      handelRemoveTodo();
    }

    setIsEditing(false);
  };

  const handelKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handelEditTodo();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  return (
    <li
      className={cn({
        completed: completed === true,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleChangeTodo}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handlerDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handelRemoveTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handelNewTitle}
        onBlur={handelEditTodo}
        onKeyUp={handelKeyUp}
        ref={titleField}
      />
    </li>
  );
};
