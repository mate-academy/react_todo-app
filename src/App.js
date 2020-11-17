import React, { useState } from 'react';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [activeTodos, setActiveTodos] = useState(0);

  const addNewTodo = (title) => {
    const newTodo = {
      id: +new Date(),
      completed: false,
      title,
    };

    const currentActiveTodos = todoList.filter(
      todo => !todo.completed,
    ).length + 1;

    setTodoList([...todoList, newTodo]);

    setActiveTodos(currentActiveTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={todoList} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${activeTodos} items left`}
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
};

export default App;
