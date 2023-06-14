import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TempTodo } from './TempTodo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onRemove: (todoId: number | undefined) => void;
  showLoading: boolean | number | undefined;
  OnChangeTodo: (todoId: number | undefined,
    completed: boolean, title: string) => void;
  isEdit: number | null | undefined;
  setEdit: (edit: number | null | undefined) => void;
  handleDblClick: (todoId: number | undefined, title: string) => void;
  setEditValue: (editValue: string) => void;
  editValue: string;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  tempTodo,
  onRemove,
  showLoading,
  OnChangeTodo,
  isEdit,
  setEdit,
  editValue,
  handleDblClick,
  setEditValue,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          className={classNames('todo',
            { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => {
                OnChangeTodo(todo?.id, !todo.completed, todo.title);
              }}
            />
          </label>

          {(isEdit === todo.id)
            ? (
              <form
                onSubmit={(e) => {
                  if (editValue === todo.title) {
                    setEdit(null);

                    return;
                  }

                  if (!editValue) {
                    onRemove(todo.id);
                  }

                  e.preventDefault();
                  OnChangeTodo(todo?.id, todo.completed, editValue);
                  setEdit(null);
                }}
              >
                <input
                  className="todo__title"
                  style={{ width: '100%' }}
                  type="text"
                  value={editValue}
                  placeholder="Empty todo will be deleted"
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => {
                    OnChangeTodo(todo?.id, !todo.completed, editValue);
                    setEdit(null);

                    if (!editValue) {
                      onRemove(todo.id);
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.code === 'Escape') {
                      setEdit(null);
                    }
                  }}
                />
              </form>
            )
            : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => handleDblClick(todo.id, todo.title)}
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => onRemove(todo.id)}
                >
                  ×
                </button>
              </>
            )}

          <div className={`modal overlay ${showLoading === todo.id ? ' is-active' : ''}`}>
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {tempTodo && <TempTodo todo={tempTodo} />}
    </section>
  );
});
