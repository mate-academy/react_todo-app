import React, { useState, useMemo, useCallback } from 'react';
import { Footer } from './components/Footer';
import { TodoForm } from './components/TodoFrom';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const updateTodos = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const filterTodos = useCallback((filterBy) => {
    switch (filterBy) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'All':
      default: {
        return todos;
      }
    }
  }, [filter, todos]);

  const filteredTodos = useMemo(
    () => filterTodos(filter), [filter, filterTodos],
  );

  const deleteCompletedTodos = () => {
    setTodos(activeTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>
        <TodoForm
          updateTodos={updateTodos}
        />
      </header>

      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
      />

      {!!todos.length && (
        <Footer
          completedTodos={completedTodos}
          activeTodos={activeTodos}
          todos={filteredTodos}
          setFilter={setFilter}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      )}
    </section>
  );
}

export default App;
