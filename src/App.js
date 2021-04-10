import React, { useState, useEffect, useMemo } from 'react';
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
  const [toggledAll, setToggledAll] = useState(false);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    setLocalTodos();
  }, [todos]);

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

  const filteredTodos = useMemo(() => {
    switch (status) {
      case FILTERS.active:
        return todos.filter(todo => todo.completed === false);

      case FILTERS.completed:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [status, todos]);

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const selectAll = () => {
    if (todos.some(todo => todo.status)
      && todos.some(todo => !todo.status)) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggledAll,
    })));

    setToggledAll(!toggledAll);
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

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
