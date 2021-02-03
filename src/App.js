import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodo] = useState('');
  const [status, setStatus] = useState(false);
  // const [selectedFilter, setFilter] = useState('All');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos(prevTodos => (
      [...prevTodos,
        {
          id: +new Date(),
          title: newTodoTitle,
          completed: false,
        },
      ]
    ));
    setNewTodo('');
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleCompletedStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const makeAllTodosComplete = () => {
    if (status) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }

    setStatus(!status);
  };

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const clearCompleted = () => {
    setTodos(uncompletedTodos);
  };

  const completedTodos = todos.filter(todo => todo.completed);

  const filterTodos = (selectedFilter) => {
    const FILTERS = {
      All: todos,
      Active: todos.filter(todo => !todo.completed),
      Completed: todos.filter(todo => todo.completed),
    };

    setTodos(FILTERS[selectedFilter]);
  };

  // const changeFilter = (event) => {
  //   event.preventDefault();
  //   setFilter(event.target.name);
  // };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event => setNewTodo(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={makeAllTodosComplete}
        />

        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id}>
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  onClick={() => toggleCompletedStatus(todo.id)}
                  checked={todo.completed}
                />
                <label>{todo.title}</label>
                <button
                  type="button"
                  className="destroy"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
              <input type="text" className="edit" />
            </li>
          ))}

        </ul>
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {uncompletedTodos.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className="selected"
                name="All"
                onClick={() => filterTodos('All')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                name="Active"
                onClick={() => filterTodos('Active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                name="Completed"
                onClick={() => filterTodos('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}

export default App;
