import classNames from 'classnames';
import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoCompleted } from '../../types/TodoCompleted';
import { TodoTitle } from '../../types/TodoTitle';

type Props = {
  todo: Todo,
  removeTodo: (todoId: number) => void,
  changeTodo: (todoId: number, object: TodoTitle | TodoCompleted) => void,
  loader: number,
  loaderDeleating: number[],
  loaderAllTodos: number[],
};

export const TodoList: React.FC<Props> = ({
  todo,
  changeTodo,
  removeTodo,
  loader,
  loaderDeleating,
  loaderAllTodos,
}) => {
  const [isToggle, setIsToggle] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const onEdit = (todoTitle: string, value: Todo) => {
    if (query !== '' && query !== todoTitle) {
      changeTodo(value.id, { title: query });
      setIsToggle(false);
    }

    if (query === '') {
      removeTodo(value.id);
    }
  };

  const onEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsToggle(false);
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

        {isToggle ? (
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
              onKeyDown={onEscape}
              onBlur={() => {
                onEdit(todo.title, todo);
              }}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setIsToggle(true);
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
          className={classNames('modal', 'overlay', {
            'is-active': loaderDeleating.includes(todo.id)
            || loaderAllTodos.includes(todo.id)
            || loader === todo.id
            || todo.id === 0,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};
