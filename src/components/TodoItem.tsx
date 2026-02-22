import { Todo } from '../types/Todo';
import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { removeTodo, toggleTodo, updateTodoTitle, focusInput } =
    useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.title);
  const handleRemoveButton = () => {
    removeTodo(todo.id);
    focusInput();
  };

  const handleSave = () => {
    const trimmedValue = editedValue.trim();

    if (!trimmedValue) {
      removeTodo(todo.id);
    } else {
      updateTodoTitle(todo.id, trimmedValue);
    }

    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.completed}
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
              setEditedValue(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveButton}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={editedValue}
            onChange={e => setEditedValue(e.target.value)}
            onBlur={handleSave}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setIsEditing(false);
                setEditedValue(todo.title);
              }
            }}
          />
        </form>
      )}
    </div>
  );
};
