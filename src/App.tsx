import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  addTodoToServer,
  deleteTodoFromServer,
  editTodo,
  getTodos,
} from './api/api';
import { Todo } from './types/Todo';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodo, setVisibleTodo] = useState<Todo[]>([]);
  const [searchValue, setSearchValue] = useState<Todo['title']>('');
  const [filterValue, setFilterValue] = useState<string>('all');

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setVisibleTodo(todosFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    switch (filterValue) {
      case 'active':
        setVisibleTodo(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setVisibleTodo(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodo(todos);
        break;
    }
  }, [filterValue, todos]);

  const addTodo = async (title: Todo['title']) => {
    await addTodoToServer(title);

    fetchTodos();
  };

  const deleteTodo = async (todoId: Todo['id']) => {
    await deleteTodoFromServer(todoId);

    fetchTodos();
  };

  const updateTodo = async (todoId: Todo['id'], completed: Todo['completed']) => {
    await editTodo(todoId, completed);

    fetchTodos();
  };

  const deleteAllCompleted = () => {
    todos.filter(todo => todo.completed).map(todo => deleteTodo(todo.id));
  };

  const chekAllTodos = () => {
    if (todos.filter(todo => !todo.completed).length === 0) {
      todos.map(todo => updateTodo(todo.id, false));
    } else {
      todos.map(todo => updateTodo(todo.id, true));
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (searchValue.trim()) {
              addTodo(searchValue);
            }

            setSearchValue('');
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.filter(todo => !todo.completed).length === 0}
          onChange={() => chekAllTodos()}
        />
        <label htmlFor="toggle-all">
          Mark all as complete
          <input hidden />
        </label>

        {todos && (
          <ul className="todo-list">
            {visibleTodo.map(todo => (
              <li
                key={todo.id}
                className={classNames({ completed: todo.completed })}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    readOnly
                    checked={todo.completed}
                    onClick={() => {
                      updateTodo(todo.id, !todo.completed);
                      setFilterValue('all');
                    }}
                  />
                  <label htmlFor="#">
                    {todo.title}
                    <input hidden />
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => {
                      deleteTodo(todo.id);
                      fetchTodos();
                    }}
                  >
                    x
                  </button>
                </div>
                <input type="text" className="edit" />
              </li>
            ))}
          </ul>
        )}
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({ selected: filterValue === 'all' })}
                onClick={() => {
                  setFilterValue('all');
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({ selected: filterValue === 'active' })}
                onClick={() => {
                  setFilterValue('active');
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({ selected: filterValue === 'completed' })}
                onClick={() => {
                  setFilterValue('completed');
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.filter(todo => todo.completed).length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                deleteAllCompleted();
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};

export default App;
