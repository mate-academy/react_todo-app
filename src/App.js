import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);

  const addTodo = (event) => {
    if (!newTodo) {
      return;
    }

    event.preventDefault();
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
            <TodoList items={todos} setTodos={setTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos
                .filter(todo => todo.completed === false).length} todos left`}
            </span>

            <TodoFilter />

            <button type="button" className="clear-completed">
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default TodoApp;
