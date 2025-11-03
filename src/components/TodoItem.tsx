import React, { useState } from 'react';
import { Todo, useTodos } from '../context/TodosContext';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodoTitle } = useTodos();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => setEditing(true);

  const handleSubmit = () => {
    const trimmed = newTitle.trim();

    if (!trimmed) {
      deleteTodo(todo.id);
    } else {
      updateTodoTitle(todo.id, trimmed);
    }

    setEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }

    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <li
      className={todo.completed ? 'todo-item completed' : 'todo-item'}
      data-cy="TodoItem"
    >
      {/* Чекбокс для toggle */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        data-cy="TodoCheckbox"
      />

      {!editing ? (
        <>
          <span
            className="todo-title"
            onDoubleClick={handleEdit}
            data-cy="TodoTitle"
          >
            {todo.title}
          </span>
          <button
            className="delete"
            onClick={() => deleteTodo(todo.id)}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      ) : (
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleSubmit}
          onKeyUp={handleKeyUp}
          autoFocus
          className="edit-input"
          data-cy="TodoEditInput"
        />
      )}
    </li>
  );
};

export default TodoItem;
