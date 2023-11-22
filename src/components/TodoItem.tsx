import React, {
  useContext, useState, useEffect, useRef, ChangeEvent,
} from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const completeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTodos = todos.map((item: Todo) => (item.id === todo.id
      ? { ...item, completed: e.target.checked } : item));

    setTodos(updatedTodos);
  };

  const deleteTodo = () => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);

    setTodos(updatedTodos);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    if (editedTitle.trim() === '') {
      deleteTodo();
    } else {
      const updatedTodos = todos.map((item) => (item.id === todo.id
        ? { ...item, title: editedTitle.trim() } : item));

      setTodos(updatedTodos);
    }

    setEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(todo.title);
      setEditing(false);
    } else if (e.key === 'Enter') {
      handleBlur();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={completeTodo}
          className="toggle"
          id={`todo-toggle-${todo.id}`}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          onClick={deleteTodo}
          className="destroy"
          type="button"
          aria-label="Delete Todo"
        />

      </div>
      {isEditing && (
        <input
          ref={inputRef}
          className="edit"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
