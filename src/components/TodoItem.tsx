import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../store/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const deleteTodo = () => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== id));
  };

  const toggleTodoCompletion = () => {
    setTodos(
      todos.map(prevTodo =>
        prevTodo.id === id ? { ...prevTodo, completed: !completed } : prevTodo,
      ),
    );
  };

  const handleEditTitle = () => {
    const trimmedValue = editTitle.trim();

    if (!trimmedValue) {
      deleteTodo();
      setIsEditing(false);

      return;
    }

    setTodos(
      todos.map(prevTodo =>
        prevTodo.id === id ? { ...prevTodo, title: trimmedValue } : prevTodo,
      ),
    );
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditTitle();
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-completed-${id}`}
          checked={completed}
          onChange={toggleTodoCompletion}
        />

        <label htmlFor={`toggle-completed-${id}`}>{title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label={`Delete ${title}`}
          onClick={deleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editTitle}
        ref={inputRef}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleEditTitle}
      />
    </li>
  );
};
