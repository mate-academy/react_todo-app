import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  DispatchContext,
  StateContext,
  ActionType,
} from '../../GlobalProvider';

export const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todoList } = useContext(StateContext);
  const allCompleted = todoList.every(todo => todo.completed == true);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    dispatch({
      type: ActionType.ADD_TODO,
      payload: { id: Date.now(), title: inputValue.trim(), completed: false },
    });

    setInputValue('');
  };

  const currentInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, [todoList]);

  return (
    <header className="todoapp__header">
      {todoList.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          disabled={todoList.length < 0}
          onClick={() =>
            dispatch({
              type: ActionType.TOGGLE_TODO_ALL,
              payload: !allCompleted,
            })
          }
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={currentInput}
          value={inputValue}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};
