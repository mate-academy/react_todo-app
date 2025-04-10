import { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodos } from '../context/TodosContext';

type Props = {
  todo: Todo;
  handleChecked: (todo: Todo) => void;
  handleDeleteTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleChecked,
  handleDeleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { handleUpdateTodoTitle } = useTodos();

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    handleUpdateTodoTitle(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed === true ? 'completed' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChecked(todo)}
          aria-label="Toggle todo status"
        />
      </label>
      {isEditing === true ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={editedTitle}
          onChange={handleEditInput}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              handleUpdateTodoTitle(todo.id, editedTitle);
              setIsEditing(false);
            } else if (e.key === 'Escape') {
              setEditedTitle(todo.title);
              setIsEditing(false);
            }
          }}
          onBlur={handleSubmit}
          autoFocus
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
