import React, { useContext, useEffect, useRef } from 'react';
import { DispatchContext, StateContext } from '../context/ReduxContex';
import { Todo } from '../types/types';
import cn from 'classnames';

export const TodoAppMain: React.FC = () => {
  const { filterTodos, all, todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const renderTodo = all ? todos : filterTodos;

  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {renderTodo.map((todo: Todo) => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.complate,
          })}
        >
          <label className="todo__status-label">
            <input
              onChange={() => dispatch({ type: 'checked', currentId: todo.id })}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          {!todo.edit && (
            <span
              onDoubleClick={() =>
                dispatch({ type: 'edit', currentId: todo.id })
              }
              data-cy="TodoTitle"
              className="todo__title"
            >
              {todo.text}
            </span>
          )}

          {todo.edit && (
            <form
              onSubmit={event =>
                dispatch({
                  type: 'editSubmit',
                  event: event,
                  currentId: todo.id,
                })
              }
            >
              <input
                onChange={event =>
                  dispatch({
                    type: 'setNewTitle',
                    value: event.target.value,
                    currentId: todo.id,
                  })
                }
                ref={titleField}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue={todo.text}
                onBlur={() =>
                  dispatch({
                    type: 'editSubmit',
                    currentId: todo.id,
                  })
                }
                onKeyUp={event =>
                  dispatch({
                    type: 'escape',
                    key: event.key,
                    currentId: todo.id,
                  })
                }
              />
            </form>
          )}

          {!todo.edit && (
            <button
              onClick={() => dispatch({ type: 'delete', currentId: todo.id })}
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
