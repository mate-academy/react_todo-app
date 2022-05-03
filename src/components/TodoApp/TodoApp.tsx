import React, { useState, useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const addTodo = (title:string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    return newTodo;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle) {
      setTodos([
        ...todos,
        addTodo(newTodoTitle),
      ]);

      setNewTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleTitleChange}
      />
    </form>
  );
};
