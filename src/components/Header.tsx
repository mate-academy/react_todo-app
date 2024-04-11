import React from 'react';
import cn from 'classnames';

import {
  StateContext,
  DispatchContext,
  FocusContext,
} from './GlobalStateProvider';

import { toggleAllTodosCompleted } from '../services/ToggleAllTodos';
import { addTodo } from '../services/AddTodo';

type Props = {
  title: string;
  onChange: (value: string) => void;
};
const Header: React.FC<Props> = ({ title, onChange }) => {
  const { todos } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const { setFocus, inputRef } = React.useContext(FocusContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!title.trim()) {
      e.preventDefault();

      addTodo(title, dispatch);
      onChange('');
      setFocus();
    }
  };

  const handleToggleAllClick = () => {
    toggleAllTodosCompleted(dispatch);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAllClick}
      />

      <form className="todoapp__new-todo-form">
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};

export default React.memo(Header);
