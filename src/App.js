import React, { useState } from 'react';
import { Footer } from './Components/Footer/Footer';
import { TodoList } from './Components/TodoList/TodoList';
import { FILTERS } from './vars';

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState(false);

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

  const changeAllTodosStatus = () => {
    if (status) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    }

    setStatus(!status);
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
                onChange={() => {
                  changeAllTodosStatus();
                  setStatus(!status);
                }
                }
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )
        }
        <TodoList
          items={filteredTodos}
          changeChecked={changeChecked}
          deleteTodo={deleteTodo}
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
