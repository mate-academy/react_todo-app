import React from 'react';
import cn from 'classnames';

import { StateContext, DispatchContext } from './GlobalStateProvider';

import { toggleAllTodosCompleted } from '../services/ToggleAllTodos';
import { addTodo } from '../services/AddTodo';

type Props = {
  title: string;
  onChange: (value: string) => void;
};
const Header: React.FC<Props> = ({ title, onChange }) => {
  const { todos } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      e.preventDefault();

      addTodo(title, dispatch);
      onChange('');
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
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </form>
    </header>
  );
};

export default React.memo(Header);
