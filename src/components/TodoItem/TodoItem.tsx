import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const deleteTodo = () => {
    dispatch({ type: 'delete_todo', payload: todo.id });
  };

  const toggleCompleted = () => {
    dispatch({ type: 'toggle_completed', payload: id });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (title !== editedTitle) {
      dispatch({ type: 'edit_todo', payload: { id, title: editedTitle } });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
      key={id}
    >
      <div className="view">
        <input
          onChange={toggleCompleted}
          checked={completed}
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
        />
        <label onDoubleClick={handleDoubleClick} htmlFor={`toggle-view-${id}`}>
          {title}
        </label>
        <button
          onClick={deleteTodo}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </li>
  );
};
