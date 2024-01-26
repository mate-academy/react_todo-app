import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoUpdateContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { title, completed } = todo;

  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const { deleteTodo, updateTodo } = useContext(TodoUpdateContext);

  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && editInput.current) {
      editInput.current.focus();
    }
  }, [editing]);

  const editTodo = () => {
    const updTodo = { ...todo, title: editedTitle.trim() };

    updateTodo(updTodo);
    setEditing(false);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = { ...todo, completed: e.target.checked };

    updateTodo(updatedTodo);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setEditing(false);
    }

    if (e.key === 'Enter') {
      if (!editedTitle.trim()) {
        deleteTodo(todo);
      } else {
        editTodo();
      }

      setEditing(false);
    }
  };

  return (
    <li
      className={cn({ completed, editing })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChecked}
        />
        <label>{title}</label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInput}
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onKeyUp={handleKeyUp}
        onBlur={editTodo}
      />
    </li>
  );
});
