/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../utils/context';

interface Props {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onComplete }) => {
  const [onEdit, setOnEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleDoubleClick = () => {
    setOnEdit(!onEdit);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: onEdit,
      })}
      value={newTitle}
      onChange={(event) => setNewTitle(event.currentTarget.value.toString())}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => onComplete(todo)}
        />
        <label>{todo.title}</label>
        <button
          onClick={() => onDelete(todo)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
