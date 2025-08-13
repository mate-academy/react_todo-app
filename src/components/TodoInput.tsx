import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from './TodoContext';
import { TodoFilters } from './TodoFilters';

export const TodoInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const previousTodosLength = useRef(TodoFilters.length);

  useEffect(() => {
    if (todos.length < previousTodosLength.current && inputRef.current) {
      inputRef.current.focus();
    }

    previousTodosLength.current = TodoFilters.length;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo(inputValue);
      setInputValue('');
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
