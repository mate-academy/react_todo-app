import React, { useContext, useState } from 'react';
import './header.css';
import { TodosContext } from '../../context/TodosContext';

export const Header = () => {
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);
  const [titleField, setTitleField] = useState('');

  const newTodoItem = {
    id: +new Date(),
    title: titleField,
    completed: false,
  };

  const reset = () => {
    setTitleField('');
  };

  const addTodos = () => setTodos([
    ...todos,
    newTodoItem,
  ]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (titleField.trim()) {
      addTodos();
    }

    reset();
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          value={titleField}
          onChange={(event) => setTitleField(event.target.value)}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
