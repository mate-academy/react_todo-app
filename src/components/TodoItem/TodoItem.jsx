import React, { useState, useContext } from 'react';
import { Context } from '../../context';

export const TodoItem = ({ todo }) => {
  const { changeTodoStatus } = useContext(Context);
  const { removeTodo } = useContext(Context);
  const { changeTodoTitle } = useContext(Context);
  const { filters } = useContext(Context);

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newTitleToSet, setNewTitleToSet] = useState(todo.title);

  function endEditing(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newTitleToSet.trim().length > 0) {
        changeTodoTitle(todo.id, newTitleToSet);
      } else {
        setNewTitleToSet(todo.title);
      }
      setIsBeingEdited(false);
    }

    if (event.key === 'Escape') {
      setIsBeingEdited(false);
    }
  }

  function endEditingByBlur(event) {
    if (newTitleToSet.trim().length > 0) {
      changeTodoTitle(todo.id, newTitleToSet);
    } else {
      setNewTitleToSet(todo.title);
    }
    setIsBeingEdited(false);

    if (event.key === 'Escape') {
      setIsBeingEdited(false);
    }
  }

  return (
    <>
      <li
        key={todo.id}
        className={(
          todo.completed ? filters.Completed : ''
          ) + (
            isBeingEdited ? ' editing ' : ''
        )}
      >

        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => changeTodoStatus(todo.id)}
          />
          <label
            onDoubleClick={() => setIsBeingEdited(true)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>

        {isBeingEdited && (
          <input
            type="text"
            className="edit"
            id="editingInput"
            name="editInput"
            value={newTitleToSet}
            autoFocus
            onChange={(event) => setNewTitleToSet(event.target.value)}
            focus={true}
            onKeyDown={(event) => endEditing(event)}
            onBlur={(event) => endEditingByBlur(event)}
          />
        )}

      </li>
    </>
  );
}
