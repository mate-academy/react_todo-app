/* eslint no-console: ["error", { allow: ["warn", "log", "error"] }] */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useTodoContext } from '../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const { removeTodo, updateTodo, loadingIds } = useTodoContext();
  const [showForm, setShowForm] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const saveNewTitle = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    const newTitle = editedTitle.trim();

    if (!newTitle) {
      try {
        await removeTodo(todo.id);
        setShowForm(false);
      } catch (error) {
        setEditedTitle(todo.title);

        console.error('Failed to remove todo:', error);
        setShowForm(true);
      }
    } else if (newTitle !== todo.title) {
      try {
        await updateTodo(todo.id, { title: newTitle });
        setShowForm(false);
      } catch (error) {
        console.error('Failed to save new title:', error);
      }
    } else {
      setShowForm(false);
    }

    setIsSaving(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        saveNewTitle();
        break;
      case 'Escape':
        setEditedTitle(todo.title);
        setShowForm(false);
        break;
      default:
        break;
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        />
      </label>

      {showForm ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="What needs to bhandleInputChangee done?"
          name={'title'}
          value={editedTitle}
          onChange={e => handleInputChange(e)}
          onBlur={saveNewTitle}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleOpenForm}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': loadingIds.includes(todo.id) || todo.id === 0,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
