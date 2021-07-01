import React, { useState, useMemo } from 'react';
import { NewTodo } from './components/NewTodo';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const todoInProgres = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const addTodo = (title) => {
    setTodos([
      ...todos,
      { id: +new Date(), title, completed: false },
    ]);
  };

  const clearAllCompleted = () => {
    const filteredTodos = todos.filter(todo => !todo.completed);

    setTodos(filteredTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo addTodo={addTodo} />
      </header>

      <TodoList
        todos={todos}
        setTodos={setTodos}
      />

      {todos.length > 0 && (
      <footer className="footer">
        <span className="todo-count">
          {todoInProgres}
          {' '}
          items left
        </span>

        <TodoFilter />

        {todos.length !== todoInProgres && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearAllCompleted()}
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
