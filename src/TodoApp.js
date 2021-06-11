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

  const handleToggle = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        id, title: todo.title, completed: !todo.completed,
      };
    }));
  };

  const handleToggleAll = () => {
    setTodos(todos.map(({ id, title, completed }) => ({
      id, title, completed: !completed,
    })));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => (
      todo.id !== id
    )));
  };

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

      <TodoList
        todos={todos}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
        handleDelete={handleDelete}
      />

      {todos.length > 0 && (
        <TodoFooter todosLeft={todosLeft} />
      )}
    </section>
  );
}

export default TodoApp;
