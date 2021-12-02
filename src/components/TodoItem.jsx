import { useState } from 'react';
import classNames from 'classnames';

export const TodoItem = ({
  todo,
  handleTodoEdit,
  completedChange,
  handleRemove,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const changeMode = () => {
    setEditMode(true);
  };

  const changeEditMode = ({ keyCode }) => {
    if (editTitle.length > 1 && keyCode === 13) {
      handleTodoEdit(todo, editTitle);
      setEditMode(false);
    } else if (keyCode === 27) {
      setEditMode(false);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setEditTitle(value);
  };

  return (
    <>
      {editMode ? (
        <input
          // eslint-disable-next-line
          autoFocus
          type="text"
          value={editTitle}
          className="editing"
          onKeyUp={changeEditMode}
          onChange={handleInputChange}
        />
      ) : (
        <li
          onDoubleClick={changeMode}
          className={classNames(todo.completed ? 'completed' : 'list-item')}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              onClick={() => {
                completedChange(todo);
              }}
              checked={todo.completed}
            />
            <label htmlFor="title">
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              aria-label="Destroy"
              onClick={() => {
                handleRemove(todo);
              }}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      )}
    </>
  );
};
