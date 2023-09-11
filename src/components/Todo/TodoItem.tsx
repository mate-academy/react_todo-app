/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-autofocus */
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { DispatchContext } from '../TodosContext/TodosContext';
import { ActionType } from '../../types/ActionType';

type Props = {
  todo: {
    name: string,
    completed: boolean,
    id: number,
  }
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const reducer = useContext(DispatchContext);

  const { name, completed, id } = todo;

  const [isChecked, setIsChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name);

  const handleSetCompleted = () => {
    reducer({ type: ActionType.SetCompleted, payload: id });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked);
    handleSetCompleted();
  };

  const handleDeleteClick = () => {
    reducer({ type: ActionType.Delete, payload: id });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBlur = () => {
    if (editedTitle.trim() === '') {
      reducer({ type: ActionType.Delete, payload: id });
    } else {
      reducer({
        type: ActionType.EditTitle,
        payload: { id, title: editedTitle },
      });
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(name);
    }
  };

  useEffect(() => {
    setIsChecked(completed);
  }, [todo]);

  return (
    <li className={cn({
      completed: isChecked,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${isChecked ? `toggle-completed${id}` : `toggle-view${id}`}`}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />

        <label
          htmlFor={isChecked ? 'toggle-completed' : 'toggle-view'}
          onDoubleClick={handleDoubleClick}
        >
          {editedTitle}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      )}
    </li>
  );
};
