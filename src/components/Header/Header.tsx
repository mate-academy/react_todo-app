import React, { RefObject, useContext, useState } from 'react';
import './Header.scss'
import cn from 'classnames';

import { TodoContext } from '../../context/TodoContext';

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ inputRef }) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext must be used within TodoProvider');

  const { todos, addTodo, toggleAll, setErrorMessage } = context;
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.length === 0) {
      setErrorMessage('Need more than 0 char to create todo');
    }

    addTodo(inputValue);
    setInputValue('');
  };

  const allCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
