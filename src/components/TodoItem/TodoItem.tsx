/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { DispatchContext } from '../../contexts';

const fakeTodo: Todo = {
  title: '',
  id: -1,
  completed: false,
};

type Props = {
  todo: Todo;
  activeTodo: Todo;
  onChangeActiveTodo: (v: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  activeTodo,
  onChangeActiveTodo,
}) => {
  const { title, id, completed } = todo;
  const [inputValue, setInputValue] = useState('');
  const dispatchTodosData = useContext(DispatchContext);

  useEffect(() => setInputValue(activeTodo.title), [activeTodo]);

  function deleteTodo(int: number) {
    dispatchTodosData({ type: 'deleteTodo', payload: int });
  }

  function togleTodo(int: number) {
    dispatchTodosData({ type: 'togleTodo', payload: int });
  }

  function changeTitle() {
    if (inputValue.trim().length === 0) {
      deleteTodo(id);
      onChangeActiveTodo(fakeTodo);

      return;
    }

    dispatchTodosData({
      type: 'changeTitle',
      payload: { title: inputValue.trim(), id },
    });
    onChangeActiveTodo(fakeTodo);
  }

  function keyUpOnForm(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      changeTitle();
    } else if (e.key === 'Escape') {
      onChangeActiveTodo(fakeTodo);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => togleTodo(id)}
        />
      </label>

      {activeTodo.id === id ? (
        <form onKeyUp={keyUpOnForm} onSubmit={e => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todoapp__change-title"
            placeholder="Empty todo will be deleted"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={changeTitle}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onChangeActiveTodo(todo)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
