import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  addTodoToServer,
  changeTodoStatus,
  deleteTodoFromServer,
  getTodos,
  changeTodoTitle,
} from './api';
import { TodoList } from './components/todoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState('all');
  const [newTodo, setNewTodo] = useState('');

  const getTodosFromServer = async() => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setDisplayTodos(todosFromServer);
    } catch (error) {
      Promise.reject(new Error(error));
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    switch (filterTodo) {
      case 'active':
        setDisplayTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setDisplayTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setDisplayTodos(todos);
    }
  }, [filterTodo, todos]);

  const addTodo = async(title) => {
    await addTodoToServer(title);

    getTodosFromServer();
  };

  const deleteTodo = async(todoId) => {
    await deleteTodoFromServer(todoId);

    getTodosFromServer();
  };

  const deteleCompletedTodos = () => {
    todos.filter(todo => todo.completed).forEach(todo => deleteTodo(todo.id));
  };

  const changeStatusTodo = async(id, status) => {
    await changeTodoStatus(id, status);
    getTodosFromServer();
  };

  const changeStatusAllTodo = () => {
    if (todos.filter(todo => !todo.completed).length === 0) {
      todos.forEach(todo => changeStatusTodo(todo.id, false));
    } else {
      todos.forEach(todo => changeStatusTodo(todo.id, true));
    }
  };

  const changeTitleTodo = async(todoId, title) => {
    await changeTodoTitle(todoId, title);
    getTodosFromServer();
  };

  const todoLeft = () => todos.filter(todo => !todo.completed).length;
  const todoDone = () => todos.filter(todo => todo.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todo App</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTodo.trim()) {
              addTodo(newTodo);
            }

            setNewTodo('');
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.filter(todo => !todo.completed).length === 0}
            onChange={() => changeStatusAllTodo()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            displayTodos={displayTodos}
            deleteTodo={deleteTodo}
            changeStatusTodo={changeStatusTodo}
            changeTitleTodo={changeTitleTodo}
          />
        </>
      </section>
      <footer className="footer">
        <span className="todo-count">
          {todoLeft() > 0 && `${todoLeft()} ${todoLeft() === 1 ? 'item' : 'items'} left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: filterTodo === 'all' })}
              onClick={() => setFilterTodo('all')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={classNames({ selected: filterTodo === 'active' })}
              onClick={() => setFilterTodo('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={classNames({ selected: filterTodo === 'completed' })}
              onClick={() => setFilterTodo('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        {todoDone() > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => {
              deteleCompletedTodos();
            }}
          >
            Clear completed
          </button>
        )}
      </footer>
    </section>
  );
};

export default App;
