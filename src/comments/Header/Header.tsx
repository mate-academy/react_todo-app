import React, { useState } from 'react';
import { useTodos, Todo } from '../TodosContext';

export const Header: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, setTodos } = useTodos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    setTodos([newTodoItem, ...todos]);

    setNewTodo('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What do you need to do?"
          value={newTodo}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
