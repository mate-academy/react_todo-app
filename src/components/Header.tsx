import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodoContext';

export const Header: React.FC = () => {
  const { todos, addTodo, onToggleAll, registerFocusHandler } =
    useContext(TodosContext);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    registerFocusHandler(() => {
      inputRef.current?.focus();
    });
  }, [registerFocusHandler]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    addTodo({
      id: +new Date(),
      title: inputValue.trim(),
      completed: false,
    });

    setInputValue('');
    inputRef.current?.focus();
  };

  const handleOnclick = () => {
    onToggleAll();
    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? `active` : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleOnclick}
        />
      )}

      {/* Add a todo on form submit */}
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
