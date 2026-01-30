import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import cn from 'classnames';
import {
  DispatchContext,
  StateContext,
  ActionType,
} from '../../GlobalProvider';

export const Section: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [select, setSelect] = useState(-1);
  const { todoVisible } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const selectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, [select]);

  const handleSelect = (todo: Todo) => {
    setSelect(todo.id);
    setInputValue(todo.title);
  };

  const handleSubmit = (todo: Todo) => {
    if (inputValue.trim().length === 0) {
      dispatch({ type: ActionType.DELETE_TODO, payload: todo.id });

      return;
    }

    if (todo.title !== inputValue) {
      dispatch({
        type: ActionType.CHANGE,
        payload: {
          title: inputValue.trim(),
          id: todo.id,
        },
      });
    }

    setSelect(-1);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    if (event.key === 'Escape') {
      setInputValue(todo.title);
      setSelect(-1);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoVisible.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={cn('todo', {
            completed: todo.completed,
          })}
          onDoubleClick={() => handleSelect(todo)}
        >
          <label className="todo__status-label">
            {/* list */}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() =>
                dispatch({
                  type: ActionType.TOGGLE_TODO,
                  payload: {
                    completed: !todo.completed,
                    id: todo.id,
                  },
                })
              }
            />
          </label>

          {select !== todo.id ? (
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
          ) : (
            <form onSubmit={() => handleSubmit(todo)}>
              <input
                ref={selectRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={inputValue}
                onKeyDown={e => handleKeyDown(e, todo)}
                onChange={event => setInputValue(event.target.value)}
                onBlur={() => handleSubmit(todo)}
              />
            </form>
          )}

          {todo.id !== select && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() =>
                dispatch({ type: ActionType.DELETE_TODO, payload: todo.id })
              }
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
