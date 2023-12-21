import React, { useState, useRef, useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { ITodo } from '../types/types';

type Props = {
  onItemDelete: (id: number) => void;
  todoItem: ITodo;
};

export const Todo: React.FC<Props> = ({
  onItemDelete,
  todoItem,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todoItem.title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    dispatch,
  } = React.useContext(TodosContext);

  const handleTitleSave = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    if (!editedTitle.trim()) {
      dispatch({ type: 'REMOVE_TODO_ITEM', id });
    } else {
      dispatch({ type: 'SAVE_EDITED_TITLE', title: editedTitle, titleId: id });
    }

    setEdit(!edit);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const handleLabel = () => {
    setEdit(true);
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
              ref={inputRef}
              type="text"
              id="editID"
              className="edit"
              value={editedTitle}
              onBlur={() => setEdit(false)}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </form>
        ) : (
          <label
            htmlFor="editID"
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
