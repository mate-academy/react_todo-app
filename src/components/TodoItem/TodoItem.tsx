import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { ToDo } from '../../types/ToDo';
import { TodosContext } from '../../contexts/TodosContext';

type Props = {
  todo: ToDo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const elemtnId = `toggle-${id}`;

  const [editMode, setEditMode] = useState(false);
  const [changedTitle, setChangedTitle] = useState(title);

  const {
    markOneComplete,
    removeTodo,
    updateTodo,
  } = useContext(TodosContext);

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handlkeMarkOneComplete = () => {
    markOneComplete(id);
  };

  const removeHandler = () => {
    removeTodo(id);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(event.target.value);
  };

  const handleApplyChanges = () => {
    const newTitile = changedTitle.trim();

    if (newTitile.length > 0) {
      setChangedTitle(newTitile);
      setEditMode(false);
      updateTodo(id, newTitile);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setChangedTitle(title);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'enter':
        handleApplyChanges();
        break;
      case 'escape':
        handleCancelEdit();
        break;
      default:
        break;
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <li className={classNames({
      completed,
      editing: editMode,
    })}
    >
      {!editMode ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            id={elemtnId}
            onChange={handlkeMarkOneComplete}
          />
          <label onDoubleClick={handleEditMode}>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={removeHandler}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          value={changedTitle}
          onChange={handleChangeTitle}
          onBlur={handleApplyChanges}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
      )}
    </li>
  );
};
