/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Todo } from '../../types/TodoApp';
import { DispatchContext } from '../../Context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const dispatch = useContext(DispatchContext);

  const [updateTitle, setUpdateTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const handleCompleted = () => {
    dispatch({ type: 'toggleStatus', payload: id });
  };

  const handleDelete = () => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setUpdateTitle(title);
      setIsEditing(false);
    }

    if (e.key === 'Enter') {
      if (updateTitle.trim() === '') {
        dispatch({ type: 'deleteTodo', payload: id });
      }

      dispatch({
        type: 'updateTodo',
        payload: { ...todo, title: updateTitle },
      });

      setIsEditing(false);
    }
  };

  const handleEditBlur = () => {
    if (updateTitle.trim() === '') {
      dispatch({ type: 'deleteTodo', payload: id });
    }

    if (updateTitle !== title) {
      dispatch({
        type: 'updateTodo',
        payload: { ...todo, title: updateTitle },
      });
    }

    setIsEditing(false);
  };

  return (
    <li key={id} className={classNames({ completed, editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCompleted}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={updateTitle}
        onChange={handleUpdateTitle}
        onKeyUp={handleEdit}
        onBlur={handleEditBlur}
      />
    </li>
  );
};
