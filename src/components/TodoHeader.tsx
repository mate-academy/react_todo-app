import React, { useContext, useRef, useEffect } from 'react';
import { DispatchContext, StateContext } from '../Store';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const { title, todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length) {
      dispatch({ type: 'addTodo' });
      dispatch({ type: 'setTitle', text: '' });
    }
  };

  const allTodosCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    if (allTodosCompleted) {
      dispatch({
        type: 'setTodos',
        newTodos: todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      });

      return;
    }

    dispatch({
      type: 'setTodos',
      newTodos: todos.map(todo => ({
        ...todo,
        completed: true,
      })),
    });
  };

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handlerSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          // autoFocus
          ref={inputRef}
          value={title}
          onChange={event =>
            dispatch({
              type: 'setTitle',
              text: event.target.value.toString(),
            })
          }
        />
      </form>
    </header>
  );
};
