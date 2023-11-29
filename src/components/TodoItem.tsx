/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';
import { KeyCode } from '../types/KeyCode';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useContext(DispatchContext);
  const titleRef = useRef<HTMLInputElement>(null);

  const toggleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'updateTodo',
      payload: {
        id,
        title,
        completed: e.target.checked,
      },
    });
  };

  const handleDestroy = () => {
    dispatch({
      type: 'destroy',
      payload: todo.id,
    });
  };

  const handleDoubleClick = () => {
    setNewTitle(title);
    setIsEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KeyCode.Enter: {
        if (!newTitle.trim()) {
          dispatch({
            type: 'destroy',
            payload: todo.id,
          });

          return;
        }

        dispatch({
          type: 'updateTodo',
          payload: { ...todo, title: newTitle },
        });
        setIsEditing(false);
        break;
      }

      case KeyCode.Escape:
        setNewTitle(title);
        setIsEditing(false);
        break;

      default:
        break;
    }
  };

  const handleOnBlur = () => {
    if (!newTitle.trim()) {
      dispatch({
        type: 'destroy',
        payload: todo.id,
      });

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: { ...todo, title: newTitle },
    });
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <li
        className={
          cn({
            completed,
            editing: isEditing,
          })
        }
        key={todo.id}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={String(todo.id)}
            checked={completed}
            onChange={toggleStatus}
          />
          <label
            role="presentation"
            onClick={e => e.preventDefault()}
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDestroy}
          />
        </div>

        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleOnBlur}
          ref={titleRef}
        />
      </li>
    </>
  );
};
