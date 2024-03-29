import React, { useState, useContext, useEffect, useRef } from 'react';
import { DispatchContext } from '../../context/TodosContext';
import { ItemType } from '../../types/types';
import cn from 'classnames';

export const TodoItem: React.FC<{ todo: ItemType }> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [completedState, setCompletedState] = useState<boolean>(todo.completed);
  const [editState, setEditState] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleChange = () => {
    const updatedTodo = { ...todo, completed: !completedState };

    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
    setCompletedState(!completedState);
  };

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  const handleDoubleClick = () => {
    setEditState(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const saveChanges = () => {
    if (editedTitle.trim() === '') {
      handleDeleteClick();
    } else {
      const updatedTodo = { ...todo, title: editedTitle };

      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
      setEditState(false);
    }
  };

  const cancelEditing = () => {
    setEditedTitle(todo.title);
    setEditState(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveChanges();
    } else if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  useEffect(() => {
    setCompletedState(todo.completed);
  }, [todo]);

  useEffect(() => {
    if (editState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editState]);

  return (
    <li
      className={cn({ completed: completedState, editing: editState })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={completedState}
          onChange={handleToggleChange}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={handleTitleChange}
        onKeyUp={handleKeyUp}
        onBlur={saveChanges}
        ref={inputRef}
      />
    </li>
  );
};
