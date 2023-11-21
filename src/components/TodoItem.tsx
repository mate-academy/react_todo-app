import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../store';
import { Todo } from '../types/Todo';

type Props = {
  item: Todo,
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const classes = classNames({
    completed: item.completed,
    editing: isEditing,
  });

  const handleBlur = () => {
    setIsEditing(false);

    dispatch({
      type: 'UPDATE_TODO_TITLE',
      payload: { id: item.id, title: editedTitle },
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);

      dispatch({
        type: 'UPDATE_TODO_TITLE',
        payload: { id: item.id, title: editedTitle },
      });
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      className={classes}
      onBlur={handleBlur}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: item })}
        />
        <label>{item.title}</label>
        <button
          aria-labelledby="submitLabel"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'DELETE_TODO', payload: item })}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onKeyUp={handleKeyUp}
        onChange={e => setEditedTitle(e.target.value)}
      />
    </li>
  );
};
