import React, { useState, useMemo, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const filters = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);
  const [filter, setFilter] = useState(filters.all);

  useEffect(() => {
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => todos.filter((todo) => {
    switch (filter) {
      case filters.completed:
        return todo.completed;

      case filters.active:
        return !todo.completed;

      default:
        return todo;
    }
  }), [filter, todos]);

  const completedTodos = todos.filter(todo => todo.completed);
  const areAllTodosCompleted = completedTodos.length === todos.length;

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const areAllTodosUncompleted = uncompletedTodos.length === todos.length;

  const addTodo = (event) => {
    event.preventDefault();

    if (!newTodo) {
      return;
    }

    setTodos(prevTodos => [...prevTodos,
      {
        id: +new Date(),
        title: newTodo.trim(),
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const checkAllCompleted = () => {
    setAllCompleted(!allCompleted);

    if (areAllTodosCompleted) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));

      return;
    }

    if (areAllTodosUncompleted) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));

      return;
    }

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    })));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={event => addTodo(event)}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
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
              checked={areAllTodosCompleted}
              onChange={checkAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList items={filteredTodos} setTodos={setTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} todos left`}
            </span>

            <TodoFilter
              handleFilter={setFilter}
              filter={filter}
              filters={filters}
            />

            {todos.some(todo => todo.completed) && (
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
}

export default TodoApp;
