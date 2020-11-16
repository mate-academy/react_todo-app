import React, { useEffect, useState } from 'react';
import { NewTodoComponent } from './components/NewTodo/NewTodoComponent';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.todos) {
      const data = JSON.parse(localStorage.getItem('todos'));

      setTodos(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onChangeStatus = (id, status) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !status };
      }

      return { ...todo };
    });

    setTodos(updatedTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodoComponent setTodos={setTodos} />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={todos} onChangeStatus={onChangeStatus} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
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
