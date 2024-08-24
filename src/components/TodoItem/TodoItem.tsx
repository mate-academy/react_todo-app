import classNames from 'classnames';
import { Todo } from '../../types/TodoType';
import { useTodos } from '../../utils/TodosContext';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const inputElement = useRef<HTMLInputElement>(null);

  const handleTodoStatus = () => {
    toggleTodo(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const startEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEditSubmit = () => {
    if (editedTitle.trim() === '') {
      deleteTodo(id);
    } else {
      updateTodo(id, { title: editedTitle.trim() });
    }

    setIsEditing(false);
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputElement.current) {
      inputElement.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={handleTodoStatus}
          checked={completed}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputElement}
          value={editedTitle}
          data-cy="TodoTitleField"
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          onKeyDown={handleEditKeyDown}
          className="todo__title-field"
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={startEdit}
        >
          {title}
        </span>
      )}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDeleteTodo}
        >
          ×
        </button>
      )}
    </div>
  );
};
