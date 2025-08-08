import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  onToggle: (todoToToggle: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateTitle: (id: number, newTitle: string) => Promise<boolean>;
  processingTodoId: number | null;
  tempTodo: Todo | null;
  isTogglingAll: boolean;
  handleToggleAll: () => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onToggle,
  onDelete,
  onUpdateTitle,
  processingTodoId,
  tempTodo,
  isTogglingAll,
}) => {
  if (todos.length === 0 && !tempTodo && !isTogglingAll) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateTitle={onUpdateTitle}
          processing={processingTodoId === todo.id}
        />
      ))}

      {tempTodo && (
        <div data-cy="Todo" className="todo">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor={`temp-todo-${tempTodo.id}`}
            className="todo__status-label"
          >
            <input
              id={`temp-todo-${tempTodo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tempTodo.completed}
              disabled
              onChange={() => {}}
              aria-disabled="true"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled
            aria-disabled="true"
            aria-label="Todo is loading, deletion disabled"
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': isTogglingAll,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
