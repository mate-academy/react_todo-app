/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import {
  useContext, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useContext(DispatchContext);

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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter': {
        if (!newTitle) {
          dispatch({
            type: 'destroy',
            payload: todo.id,
          });

          return;
        }

        dispatch({
          type: 'edit',
          payload: { ...todo, title: newTitle },
        });
        setIsEditing(false);
        break;
      }

      case 'Escape':
        setIsEditing(false);
        break;

      default:
        break;
    }
  };

  const handleOnBlur = () => {
    if (!newTitle) {
      dispatch({
        type: 'destroy',
        payload: todo.id,
      });

      return;
    }

    dispatch({
      type: 'edit',
      payload: { ...todo, title: newTitle },
    });
    setIsEditing(false);
    setNewTitle(title);
  };

  return (
    <>
      <li
        className={
          cn({
            completed,
            editing: isEditing,
          })
        }
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
            onDoubleClick={() => setIsEditing(true)}
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
        />
      </li>
    </>
  );
};
