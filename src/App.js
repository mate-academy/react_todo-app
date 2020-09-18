import React, { useEffect, useState } from 'react';
import { TodoApp } from './TodoApp';
import { TodoList } from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(todos);
  }, []);

  const getTodo = (newTodo) => {
    if (newTodo.title) {
      setTodos([newTodo, ...todos]);
    }
  };

  const onStatusChange = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      }),
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp getTodo={getTodo} />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0
          ? (
            <TodoList
              todos={todos}
              onStatusChange={onStatusChange}
            />
          )
          : ''
        }
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
