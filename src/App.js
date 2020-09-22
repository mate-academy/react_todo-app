import React, { useState, useMemo, useEffect, useCallback } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);
  const [filter, setFilter] = useState(FILTERS.all);

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
      case FILTERS.completed:
        return todo.completed;

      case FILTERS.active:
        return !todo.completed;

      default:
        return todo;
    }
  }), [filter, todos]);

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );
  const areAllTodosCompleted = useMemo(
    () => completedTodos.length === todos.length, [completedTodos],
  );

  const uncompletedTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [todos],
  );
  const areAllTodosUncompleted = useMemo(
    () => uncompletedTodos.length === todos.length, [uncompletedTodos],
  );

  const isSomeCompleted = useMemo(
    () => todos.some(todo => todo.completed), [todos],
  );

  const addTodo = useCallback((event) => {
    event.preventDefault();

    if (!newTodo.trim()) {
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
  }, [newTodo]);

  const checkAllCompleted = useCallback(() => {
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
  }, [todos]);

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
            onBlur={event => addTodo(event)}
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
              {`${uncompletedTodos.length > 1
                ? `${uncompletedTodos.length} todos left`
                : `${uncompletedTodos.length} todo left`}`}
            </span>

            <TodoFilter
              handleFilter={setFilter}
              filter={filter}
              FILTERS={FILTERS}
            />

            {isSomeCompleted && (
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
