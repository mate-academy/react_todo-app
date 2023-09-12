/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { todoContext } from '../utils/todoContext';

export const Header: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const { todos, setTodos } = useContext(todoContext);

  const isValidQuery = inputQuery.trim();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const addNewTodo = () => {
    const newTodo = {
      id: +new Date(),
      title: inputQuery.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setInputQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidQuery) {
      return;
    }

    addNewTodo();
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        onClick={handleToggleAll}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputQuery}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
