import classNames from 'classnames';
import React, { useContext } from 'react';
import '../styles/todo.scss';
import '../styles/todoapp.scss';
import { Dispatch, StateContext } from './ToDoContext';
import { FilterButtons } from '../types/FilterType';

export const ToDoList: React.FC = () => {
  const { filterButton } = useContext(StateContext);

  const dispatch = useContext(Dispatch);
  const { todos } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    if (filterButton === FilterButtons.Completed) {
      return todo.completed;
    }

    if (filterButton === FilterButtons.Active) {
      return !todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        filteredTodos.map(todo => (
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
                disabled={todo.editted}
                onClick={() => {
                  dispatch({
                    type: 'CHANGE TODO STATUS',
                    idNumber: todo.id,
                  });
                }}
              />
            </label>
            {todo.editted ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  dispatch({
                    type: 'EDIT TODO',
                    idNumber: todo.id,
                  });
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={todo.title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                      type: 'UPDATE TITLE',
                      idNumber: todo.id,
                      edittedTitle: event.target.value.toString(),
                    });
                  }}
                  onBlur={() => {
                    dispatch({
                      type: 'EDIT TODO',
                      idNumber: todo.id,
                    });
                  }}
                  onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Escape') {
                      return {
                        ...todo,
                        completed: !todo.completed,
                      };
                    }

                    return todo;
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
                      type: 'EDIT TODO',
                      idNumber: todo.id,
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
                      type: 'DELETE TODO',
                      idNumber: todo.id,
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
