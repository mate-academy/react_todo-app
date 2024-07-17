import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './StateContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

export const ToDoList = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const filteredTodos: () => Todo[] = () => {
    switch (filter) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const useFilteredTodos = filteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {useFilteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onClick={() => {
                dispatch({
                  type: 'CHANGE_STATUS',
                  id: todo.id,
                });
              }}
            />
          </label>
          {todo.editted ? (
            <form
              onSubmit={() => {
                dispatch({
                  type: 'EDIT_TODO',
                  id: todo.id,
                });
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
                onChange={e => {
                  dispatch({
                    type: 'CHANGE_TITLE',
                    id: todo.id,
                    changedTitle: e.target.value.trim(),
                  });
                }}
                onKeyUp={event => {
                  if (event.key === 'Escape') {
                    dispatch({
                      type: 'HANDLE_ESCAPE',
                      id: todo.id,
                    });
                    dispatch({
                      type: 'EDIT_TODO',
                      id: todo.id,
                    });
                  }
                }}
                onBlur={() => {
                  dispatch({
                    type: 'EDIT_TODO',
                    id: todo.id,
                  });
                }}
                autoFocus
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  dispatch({
                    type: 'EDIT_TODO',
                    id: todo.id,
                  });
                }}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  dispatch({
                    type: 'DELETE_TODO',
                    id: todo.id,
                  });
                }}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
