import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from './TodoContext';

export const TodoInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo, todos } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const previousTodosLength = useRef(todos.length);

  useEffect(() => {
    if (todos.length < previousTodosLength.current && inputRef.current) {
      inputRef.current.focus();
    }

    previousTodosLength.current = todos.length;
  }, [todos.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue) {
        addTodo(inputValue);
        setInputValue('');
      }
    }
  };

  return (
    <input
      ref={inputRef}
      data-cy="NewTodoField"
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
};
