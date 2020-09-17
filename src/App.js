import React, { useState, useMemo } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);
  const [filter, setFilter] = useState('All');

  const filteredTodos = useMemo(() => todos.filter((todo) => {
    switch (filter) {
      case 'Completed':
        return todo.completed;
      case 'Active':
        return !todo.completed;
      default:
        return todo;
    }
  }), [filter, todos]);

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
              checked={allCompleted}
              onChange={() => checkAllCompleted()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList items={filteredTodos} setTodos={setTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} todos left`}
            </span>

            <TodoFilter handleFilter={setFilter} filter={filter} />

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
