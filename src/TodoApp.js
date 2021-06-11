import React, { useState, useMemo } from 'react';
import uuid from 'react-uuid';

import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { NewTodo } from './components/NewTodo';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const todosLeft = useMemo(() => (
    todos.reduce((total, current) => {
      if (current.completed) {
        return total;
      }

      return total + 1;
    }, 0)
  ), [todos]);

  const handleAddTodo = (title) => {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: uuid(), title, completed: false },
    ]);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo handleSubmit={handleAddTodo} />
      </header>

      <TodoList todos={todos} />

      {todos.length > 0 && (
        <TodoFooter todosLeft={todosLeft} />
      )}
    </section>
  );
}

export default TodoApp;
