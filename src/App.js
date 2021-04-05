import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(FILTERS.all);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [toggledAll, setToggledAll] = useState(false);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterTodos();
    setLocalTodos();
  }, [todos, status]);

  const setLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }

    const todoLocal = JSON.parse(localStorage.getItem('todos'));

    setTodos(todoLocal);
  };

  const addTodo = () => {
    if (!title.trim()) {
      return;
    }

    setTodos(prevTodos => [...prevTodos,
      {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
      },
    ]);
    setTitle('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const filterTodos = () => {
    switch (status) {
      case FILTERS.active:
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;

      case FILTERS.completed:
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const selectAll = () => {
    setToggledAll(!toggledAll);

    if (completedTodos.length === todos.length) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));

      return;
    }

    if (activeTodos.length === todos.length) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));

      return;
    }

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggledAll,
    })));
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={completedTodos.length === todos.length}
              onChange={selectAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={filteredTodos} setTodos={setTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {activeTodos.length > 0 && (
                `${activeTodos.length} todos left`
              )}
            </span>

            <TodosFilter
              setStatus={setStatus}
              status={status}
              FILTERS={FILTERS}
            />

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
        </>
      )}
    </section>
  );
};

export default App;
