import { useState } from 'react';
import { useTodoActions } from '../context/TodoContext';

export const useHeader = () => {
  const [query, setQuery] = useState('');
  const { toggle, addTodo } = useTodoActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggle();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTitle = query.trim();

    if (!newTitle) {
      return;
    }

    addTodo(newTitle);
    setQuery('');
  };

  return { query, handleChange, handleToggle, handleSubmit };
};
