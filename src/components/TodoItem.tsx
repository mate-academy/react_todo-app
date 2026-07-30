import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodosContext';
import { useTodoItem } from '../hooks/useTodoItem';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onFocusNewTodo?: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onFocusNewTodo,
}) => {
  const { dispatch } = useTodos();
  const {
    isEditing,
    editingTitle,
    setEditingTitle,
    handleSave,
    handleKeyUp,
    handleBlur,
    handleDoubleClick,
  } = useTodoItem({ todo, onDelete, onFocusNewTodo });

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSave}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
