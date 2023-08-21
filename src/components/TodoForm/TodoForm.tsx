import React, { useState } from 'react';
import { useTodo } from '../../hooks/useTodo';

export const TodoForm: React.FC = () => {
  const [query, setQuery] = useState('');

  const { addItem } = useTodo();

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    addItem(event.target.value);
    setQuery('');
  };

  const handleBlurInput = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    addItem(event.target.value);
    setQuery('');
  };

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handlePressEnter}
        onBlur={handleBlurInput}
      />
    </form>
  );
};
