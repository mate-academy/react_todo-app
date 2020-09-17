
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

const App = () => {
  const todosTest = [
    {
      title: 'make things',
      id: 1,
      completed: false,
    },
    {
      title: 'do tasks',
      id: 2,
      completed: false,
    },
  ];

  const [todos, setTodos] = useState([...todosTest]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (todoToAdd) => {
    setTodos([...todos, todoToAdd]);
  };

  const changeStatus = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const changeStatusAll = () => {
    if (todos.some(todo => !todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodo({
              title: newTodo,
              id: +new Date(),
              completed: false,
            });
            setNewTodo('');
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
          />
        </form>
      </header>

      <TodoList
        todos={todos}
        changeStatusAll={changeStatusAll}
        changeStatus={changeStatus}
      />

      <footer className="footer">
        <span className="todo-count">
          {todos.filter(todo => !todo.completed).length}
          {' '}
          items left
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
