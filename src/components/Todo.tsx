import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Todo = ({
  onItemDelete,
  editTodo,
  editedTitleTodo,
  todoItem,
  onLabelClick,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const {
    dispatch,
  } = React.useContext(TodosContext);

  const handleTitleSave = (e, id: number) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_EDITED_TITLE', title: editedTitle, titleId: id });
    setEdit(!edit);
  };

  const handleLabel = () => {
    setEdit(!edit);
    setEditedTitle('');
  };

  const changeCheckbox = () => {
    dispatch({ type: 'MARK_TASK_AS_COMPLETED', id: todoItem.id });
  };

  return (
    <li
      className={`item ${todoItem.completed ? 'completed' : ''}`}
      key={todoItem.id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-completed-${todoItem.id}`}
          checked={todoItem.completed}
          onChange={changeCheckbox}
        />
        {edit ? (
          <form onSubmit={(e) => handleTitleSave(e, todoItem.id)}>
            <input
              type="text"
              className="edit"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </form>
        ) : (
          <label
            htmlFor={`toggle-completed-${todoItem.id}`}
            onDoubleClick={handleLabel}
          >
            {todoItem.title}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onItemDelete(todoItem.id)}
        >
          .
        </button>
      </div>
    </li>
  );
};
