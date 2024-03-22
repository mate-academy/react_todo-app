import React, { useContext, useState } from 'react';
import { Todo } from '../../types/types';
import { TodosContext } from '../../TodosContext';

export const FormTodo: React.FC = () => {
  const { setTodos } = useContext(TodosContext);

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue.trim(),
      completed: false,
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
