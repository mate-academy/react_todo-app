/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState } from 'react';
import { Todo, TodosContext } from '../todosContext';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const { deleteTodo, toggleTodo, renameTodo } = useContext(TodosContext);

  const itemClass =
    `todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`.trim();

  const handleSave = () => {
    const normalizedTitle = editText.trim();

    if (normalizedTitle === '') {
      deleteTodo(todo.id);
      setIsEditing(false);

      return;
    }

    if (normalizedTitle !== todo.title) {
      renameTodo(todo.id, normalizedTitle);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditText(todo.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);

    const newTodoField = document.querySelector(
      '[data-cy="NewTodoField"]',
    ) as HTMLInputElement;

    if (newTodoField) {
      newTodoField.focus();
    }
  };

  return (
    <div data-cy="Todo" className={itemClass}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={editText}
            onChange={event => setEditText(event.target.value)}
            onBlur={handleSave}
            onKeyUp={handleKeyUp}
          />
        </form>
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
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
