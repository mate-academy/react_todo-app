import React, { useState, useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodoApp: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');

  const { todos, setTodos } = useContext(TodosContext);

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: new Date().getTime(),
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleTodoSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
