import classNames from 'classnames';
import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoTitle } from '../../types/TodoTitle';
import { TodoCompleted } from '../../types/TodoCompleted';

type Props = {
  todo: Todo,
  changeTodo: (todoId: number, object: TodoTitle | TodoCompleted) => void
  removeTodo: (todoId: number) => void
  deletingLoader: number[],
  loaderVisibility: number,
  changeAllTodos: number[],
};

export const TodoList: React.FC<Props> = ({
  todo,
  changeTodo,
  removeTodo,
  deletingLoader: isDeleting,
  loaderVisibility,
  changeAllTodos: isChangeAllTodos,
}) => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const onEdit = (
    todoTitle: string, value: Todo,
  ) => {
    if (query !== '' && query !== todoTitle) {
      changeTodo(value.id, { title: query });
      setToggle(false);
    }

    if (query === '') {
      removeTodo(value.id);
    }
  };

  const actionOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setToggle(false);
      setQuery(todo.title);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <div
        data-cy="Todo"
        className={classNames('todo', {
          'todo completed': todo.completed,
        })}
        key={todo.id}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onChange={() => {
              changeTodo(todo.id, { completed: !todo.completed });
            }}
          />
        </label>

        {toggle ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onEdit(todo.title, todo);
            }}
          >
            <input
              type="text"
              value={query}
              className="todo__title-field"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onKeyDown={actionOnEscape}
              onBlur={() => {
                onEdit(todo.title, todo);
              }}
            />
          </form>

        )
          : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setToggle(true);
                }}
              >
                {query}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
                onClick={() => {
                  removeTodo(todo.id);
                }}
              >
                ×
              </button>
            </>
          )}
        <div
          data-cy="TodoLoader"
          className={classNames(
            'modal overlay',
            {
              'is-active': isDeleting.includes(todo.id)
                || isChangeAllTodos.includes(todo.id)
                || loaderVisibility === todo.id
                || todo.id === 0,
            },
          )}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};
