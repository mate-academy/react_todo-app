import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoHeader: React.FC = () => {
  const { addTodoHandler } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    addTodoHandler({
      id: +new Date(),
      title: newTodo,
      completed: false,
    });

    setNewTodo('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          id="formTitleInput"
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          onBlur={handleFormSubmit}
        />
      </form>
    </header>
  );
};
