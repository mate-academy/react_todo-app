import React, { useEffect, useState } from 'react';
import { Todo } from '../../types';

function TodoApp() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const resetForm = () => {
    setTodoTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodo((currTodos => {
      return [...currTodos, newTodo];
    }));

    resetForm();
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify([todo]));
  }, [todo]);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default TodoApp;
