/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../context/TodoContext';

type Props = {
  editingTodoId: number | null;
  handleEditStart: (todo: Todo) => void;
  handleRenameSubmit: (
    event: React.FormEvent | React.FocusEvent,
    todo: Todo,
  ) => void;
  chengeQuery: string;
  onChengeQuery: (value: string) => void;
  onEditingTodoId: (value: number | null) => void;
};

export const TodoSection: React.FC<Props> = ({
  editingTodoId,
  handleEditStart,
  handleRenameSubmit,
  chengeQuery,
  onChengeQuery,
  onEditingTodoId,
}) => {
  const { visibleTodos, updateTodo, deleteTodo } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos?.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              id={`todo-status-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => updateTodo(todo, { completed: !todo.completed })}
            />
          </label>

          {editingTodoId !== todo.id ? (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleEditStart(todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          ) : (
            <form onSubmit={e => handleRenameSubmit(e, todo)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={chengeQuery}
                autoFocus
                onChange={e => onChengeQuery(e.target.value)}
                onBlur={e => handleRenameSubmit(e, todo)}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    onEditingTodoId(null);
                    onChengeQuery(todo.title);
                  }
                }}
              />
            </form>
          )}
        </div>
      ))}
    </section>
  );
};
