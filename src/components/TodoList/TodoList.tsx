import classNames from 'classnames';
import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoCompleted } from '../../types/TodoCompleted';
import { TodoTitle } from '../../types/TodoTitle';

type Props = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  todo: Todo
  selectedIds: number[]
  removeTodo: (todoId: number) => void
  changeTodo: (todoId: number, object: TodoCompleted | TodoTitle) => void
};

export const TodoList: React.FC<Props> = ({
  todo,
  removeTodo,
  changeTodo,
  isLoading,
  setIsLoading,
  selectedIds,
}) => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const actionOnEdit = (
    todoTitle: string, value: Todo,
  ) => {
    if (query !== '' && query !== todoTitle) {
      setIsLoading(true);
      changeTodo(value.id, { title: query });
      setToggle(false);
    }

    if (query === '') {
      removeTodo(value.id);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const actionOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setToggle(false);
      setQuery(todo.title);
    }
  };

  return (
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
            actionOnEdit(todo.title, todo);
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
              actionOnEdit(todo.title, todo);
            }}
          />
        </form>
      ) : (
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
      {isLoading && (selectedIds.includes(todo.id)) && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
