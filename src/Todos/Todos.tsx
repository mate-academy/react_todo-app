import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store/Store';
import cn from 'classnames';
import React from 'react';

export const Todos = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, useTodos } = useContext(StateContext);

  const todosFilter = todos.filter(todo => {
    if (useTodos === 'Active') {
      return !todo.completed;
    }

    if (useTodos === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFilter.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'checked', id: todo.id })}
            />
          </label>

          {!todo.changed && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() =>
                dispatch({ type: 'setChanged', id: todo.id })
              }
            >
              {todo.title}
            </span>
          )}

          {todo.changed && (
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'setChanged', id: todo.id });
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({ type: 'escapeChangedText', id: todo.id });
                    dispatch({ type: 'setChanged', id: todo.id });
                  }
                }}
                autoFocus
                onChange={e =>
                  dispatch({
                    type: 'changed',
                    id: todo.id,
                    text: e.target.value,
                  })
                }
                onBlur={() => dispatch({ type: 'setChanged', id: todo.id })}
              />
            </form>
          )}

          {/* Remove button appears only on hover */}
          {!todo.changed && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'remove', id: todo.id })}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
