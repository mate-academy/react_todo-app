import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Todos = () => {
  const {
    state: { todos },
    dispatch,
  } = React.useContext(TodosContext);
  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', id });
  };

  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const handleLabel = () => {
    setEdit(!edit);
    setEditedTitle('');
  };

  const handleTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSave = (e, id: number) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_EDITED_TITLE', title: editedTitle, titleId: id });
    setEdit(false);
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todoItem) => (
        <li
          className={`item ${todoItem.completed ? 'completed' : ''}`}
          key={todoItem.id}
        >
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-completed" />
            {edit ? (
              <form onSubmit={(e) => handleTitleSave(e, todoItem.id)}>
                <input
                  type="text"
                  className="edit"
                  value={editedTitle}
                  onChange={handleTitle}
                />
              </form>
            ) : (
              <label
                htmlFor="toggle-completed"
                onDoubleClick={handleLabel}
              >
                {todoItem.title}
              </label>
            )}
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => handleDelete(todoItem.id)}
            >
              .
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
