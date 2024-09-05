import React, { useRef, useEffect, useContext } from 'react';
import { Key } from '../Types/key';
import { TodoContext } from './Context/TodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todoValue, setTodoValue, addTodo } = useContext(TodoContext);

  const focusedElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusedElement.current) {
      focusedElement.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Key.Enter) {
      event.preventDefault();
      addTodo();
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          value={todoValue}
          ref={focusedElement}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};
