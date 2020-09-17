import React, { useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  let todosFiltered;

  switch (filter) {
    case 'All':
      todosFiltered = todos;
      break;

    case 'Active':
      todosFiltered = todos.filter(todo => !todo.completed);
      break;

    case 'Completed':
      todosFiltered = todos.filter(todo => todo.completed);
      break;

    default:
      todosFiltered = todos;
  }

  const changeCompleted = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const markAllCompleted = () => {
    if (todos.every(todo => todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: !todo.completed })));
    } else {
      setTodos(todos.map((todo) => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        }

        return todo;
      }));
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value.trimLeft());
  };

  const handleAdd = () => {
    if (query) {
      setTodos([{
        id: +new Date(),
        title: query,
        completed: false,
      }, ...todos]);
      setQuery('');
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleChange}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleAdd();
              }
            }}
          />
        </form>
      </header>

      {(todos.length > 0) && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={markAllCompleted}
              checked={todos.every(todo => todo.completed)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={todosFiltered}
              setTodos={setTodos}
              changeCompleted={changeCompleted}
              markAllCompleted={markAllCompleted}
            />

          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <TodosFilter
              todos={todos}
              filter={filter}
              setFilter={setFilter}
            />

            {(todos.some(todo => todo.completed)) && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodos(
                  todos.filter(todo => !todo.completed),
                )}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </>
  );
};
