import React, { useState } from 'react';
import { Footer } from './Components/Footer/Footer';
import { TodoList } from './Components/TodoList/TodoList';
import { FILTERS } from './vars';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore
      = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim().length > 0) {
      const todo = {
        id: +new Date(),
        title: query,
        completed: false,
      };

      setTodos([todo, ...todos]);
    }

    setQuery('');
  };

  const changeChecked = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const filterTodos = (key) => {
    switch (key) {
      case FILTERS.active:
        return activeTodos;

      case FILTERS.completed:
        return completedTodos;

      default:
        return todos;
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = filterTodos(filter);

  const changeAllTodosStatus = (event) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    })));
  };

  const changeTitle = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        title,
      };
    }));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        {
          !!todos.length && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={todos.length === completedTodos.length}
                onChange={changeAllTodosStatus}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )
        }
        <TodoList
          items={filteredTodos}
          changeChecked={changeChecked}
          deleteTodo={deleteTodo}
          changeTitle={changeTitle}
        />
      </section>

      {
        !!todos.length && (
          <Footer
            completedTodos={completedTodos}
            activeTodos={activeTodos}
            setFilter={setFilter}
            setTodos={setTodos}
          />
        )
      }
    </section>
  );
}

export default App;
