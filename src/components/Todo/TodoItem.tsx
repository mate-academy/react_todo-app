/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../Store';
import { ActionType } from '../../types/ActionType';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleToggleTodoChange = () => {
    dispatch({ type: ActionType.Toggle, payload: todo.id });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: ActionType.Remove, payload: todo.id });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const handleBlur = () => {
    if (editText.trim()) {
      dispatch({ type: ActionType.Remove, payload: todo.id });
    } else {
      dispatch({
        type: ActionType.Update,
        payload: { id: todo.id, title: editText },
      });
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editText.trim() === '') {
        dispatch({ type: ActionType.Remove, payload: todo.id });
      } else {
        dispatch({
          type: ActionType.Update,
          payload: { id: todo.id, title: editText },
        });
      }

      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setEditText(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={classNames({ completed: todo.completed, editing: isEditing })}
    >
      <div className={todo.completed ? 'completed' : 'view'}>
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggleTodoChange}
        />
        <label
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      {isEditing ? (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : null}
    </li>
  );
};
