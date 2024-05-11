import classNames from 'classnames';
import { Todo } from '../Types/Todo';
import { useEffect, useState } from 'react';

type Props = {
  todo: Todo;
  updateTodoStatus: (id: number, newStatus: boolean) => void;
  onDeleteTodo: (id: number) => void;
  todoId: number;
  updateTodoTitle: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  updateTodoStatus,
  onDeleteTodo,
  todoId,
  updateTodoTitle = () => {},
}) => {
  const [checked, setChecked] = useState(todo.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  const saveChanges = () => {
    if (editedTitle.trim() !== '') {
      const updatedTodo = { ...todo, title: editedTitle };
      const todoFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = todoFromStorage.map((t: Todo) =>
        t.id === todo.id ? updatedTodo : t,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      updateTodoTitle(updatedTodo);
    } else {
      setEditedTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    updateTodoStatus(todo.id, e.target.checked);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.status === true })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={checked}
          onChange={handleCheckBoxChange}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          autoFocus
          onBlur={saveChanges}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              saveChanges();
            }
          }}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {editedTitle ? editedTitle : todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDeleteTodo(todoId)}
      >
        ×
      </button>
    </div>
  );
};
