import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todos } from '../types/Todos';
import { TodoContext } from '../contexts/TodoContext';

interface Props {
  items: Todos
}

export const TodoItem: React.FC<Props> = ({ items }) => {
  const {
    deleteTodo, todos, setTodos, editTodo,
  } = useContext(TodoContext);
  const { completed, title } = items;
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map((currentTodo) => (currentTodo.id === items.id
      ? { ...currentTodo, completed: !completed }
      : currentTodo));

    setTodos(updatedTodos);
  };

  const handleOnEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      deleteTodo(items.id);
    }

    if (editTitle.trim()) {
      editTodo(items.id, editTitle);
      setIsVisibleEdit(false);
    }
  };

  const handleOnKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveEdit();
    }

    if (event.key === 'Escape') {
      setIsVisibleEdit(false);
      setEditTitle(title);
    }
  };

  const textField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textField.current) {
      textField.current.focus();
    }
  }, [isVisibleEdit]);

  return (
    <li className={classNames({ completed, editing: isVisibleEdit })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckboxChange}
        />

        <label onDoubleClick={() => setIsVisibleEdit(true)}>
          {title}
        </label>
        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(items.id);
          }}
        />

      </div>

      {!!isVisibleEdit && (
        <input
          type="text"
          className="edit"
          value={editTitle}
          ref={textField}
          onBlur={saveEdit}
          onChange={handleOnEdit}
          onKeyUp={handleOnKey}
        />
      )}

    </li>
  );
};
