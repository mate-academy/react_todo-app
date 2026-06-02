/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import classNames from 'classnames';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useFocusInput } from '../../hooks/useFocusInput';
import { EditTodoForm } from '../EditTodoForm';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoListItem = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeTodo, toggleTodo, editTodo } = useTodoActions();
  const focusInput = useFocusInput();

  const { id, completed, title } = todo;

  const handleToggle = () => {
    toggleTodo(id);
    focusInput();
  };

  const handleRemove = () => {
    removeTodo(id);
    focusInput();
  };

  const handleEdit = (newTitle: string) => {
    if (!newTitle) {
      handleRemove();
    } else {
      editTodo(id, newTitle);
      focusInput();
    }
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <EditTodoForm
          title={title}
          onChange={handleEdit}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
