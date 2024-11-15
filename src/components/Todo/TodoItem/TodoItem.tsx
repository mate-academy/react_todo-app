import { FC, FormEvent } from 'react';
import { Todo } from '../../../types/Todo';
import cn from 'classnames';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';
import { useTodoFormManager } from '../../../hooks/useTodoFormManager';
import { useSelectedTodo } from '../../../hooks/useSelectedTodo';

interface TodoItemProps {
  todo: Todo;
  isLoading?: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, isLoading = false }) => {
  const { completed, id, title } = todo;
  const { isDeleting, handleDeleteTodo } = useDeleteTodo();
  const { selectedTodo, setSelectedTodo } = useSelectedTodo();
  const {
    title: updatingTitle,
    isUpdating,
    setTitle,
    handleUpdateTodo,
  } = useTodoFormManager(todo.title);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title == updatingTitle) {
      return setSelectedTodo(null);
    }

    const res = handleUpdateTodo({ ...todo, title: updatingTitle });

    if (res) {
      setSelectedTodo(null);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed })}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            handleUpdateTodo({ ...todo, completed: !todo.completed });
          }}
        />
      </label>

      {selectedTodo ? (
        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={updatingTitle}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setSelectedTodo(todo);
          }}
        >
          {title.trim()}
        </span>
      )}
      {!selectedTodo && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDeleteTodo(id)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isLoading || isDeleting || isUpdating,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
