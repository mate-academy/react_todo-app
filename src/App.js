import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { AddTodoForm } from './components/AddTodoForm';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

const getFilteredTodos = (todos, filterValue) => {
  switch (filterValue) {
    case FILTERS.active:
      return todos.filter(todo => !todo.completed);

    case FILTERS.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

function App() {
  const [todos, setTodos] = useState([]);
  const [filterValue, setFilterValue] = useState(FILTERS.all);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const renameTodo = (todoId, title) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    });

    setTodos(newTodos);
  };

  const addTodo = (title) => {
    const todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, todo]);
  };

  const toggleTodo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  const toggleAll = () => {
    const completed = activeTodos.length !== 0;

    const newTodos = todos.map((todo) => {
      if (todo.completed === completed) {
        return todo;
      }

      return { ...todo, completed };
    });

    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    setTodos(
      todos.filter(todo => todo.id !== todoId),
    );
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterValue),
    [todos, filterValue],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm onTodoAdded={addTodo} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={activeTodos.length === 0}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  completed: todo.completed,
                  editing: todo.id === selectedTodoId,
                })}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.completed}
                    onChange={() => {
                      toggleTodo(todo.id);
                    }}
                  />

                  <label
                    onDoubleClick={() => {
                      setSelectedTodoId(todo.id);
                    }}
                  >
                    {todo.title}
                  </label>

                  <button
                    type="button"
                    className="destroy"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                </div>

                {todo.id === selectedTodoId && (
                  <input
                    defaultValue={todo.title}
                    type="text"
                    className="edit"
                    onBlur={({ target }) => {
                      renameTodo(todo.id, target.value);
                      setSelectedTodoId(0);
                    }}
                    onKeyDown={({ key, target }) => {
                      if (key === 'Enter') {
                        renameTodo(todo.id, target.value);
                        setSelectedTodoId(0);
                      }

                      if (key === 'Escape') {
                        setSelectedTodoId(0);
                      }
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length === 1
              ? `1 item left`
              : `${activeTodos.length} items left`
            }
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: filterValue === FILTERS.all,
                })}
                onClick={() => {
                  setFilterValue(FILTERS.all);
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: filterValue === FILTERS.active,
                })}
                onClick={() => {
                  setFilterValue(FILTERS.active);
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: filterValue === FILTERS.completed,
                })}
                onClick={() => {
                  setFilterValue(FILTERS.completed);
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.length > activeTodos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
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
