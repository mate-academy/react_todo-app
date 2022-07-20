/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { TodoContext } from './TodoContext';
import { TodoList } from './TodoList';
import * as request from '../request/api';

export const TodoForm = () => {
  const { todos, setTodos, user, error } = useContext(TodoContext);
  const { status } = useParams();
  const [input, setInput] = useState('');
  const [countActiveTodos, setCountActiveTodos] = useState(0);
  const [countCompletedTodos, setCountCompletedTodos] = useState(0);

  const selectedUsersTodos = todos.filter(todo => todo.userId === user.id);

  const visibleTodos = selectedUsersTodos.filter((todo) => {
    switch (status) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (input) {
      await request.postNewTodo(input);
      await request.getTodos().then(result => setTodos(result));

      setInput('');
    }
  };

  const handleCountTodo = () => {
    const activeTodos = visibleTodos
      .filter(todo => todo.completed === false).length;
    const completedTodos = visibleTodos
      .filter(todo => todo.completed === true).length;

    setCountActiveTodos(activeTodos);
    setCountCompletedTodos(completedTodos);
  };

  const handleCompleteAll = () => {
    if (countActiveTodos > 0) {
      selectedUsersTodos.forEach((todo) => {
        if (todo.completed === false) {
          setTodos([...todos, todo.completed = true]);

          request.updateTodo('completed', true, todo.id);
        }
      });
    }

    if (countActiveTodos === 0) {
      selectedUsersTodos.forEach((todo) => {
        setTodos([...todos, todo.completed = false]);

        request.updateTodo('completed', false, todo.id);
      });
    }
  };

  const handleClearAll = () => {
    setTodos(selectedUsersTodos.filter(todo => todo.completed === false));

    visibleTodos.forEach((todo) => {
      if (todo.completed === true) {
        request.deleteTodo(todo.id);
      }
    });
  };

  useEffect(() => {
    handleCountTodo();
  }, [visibleTodos]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <section className="todoapp">
      <p className="user-title">{`Todo's of ${user.name}`}</p>
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            className="new-todo"
            placeholder="What needs to be done?"
            data-cy="createTodo"
            onChange={handleInput}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={handleCompleteAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={visibleTodos} />
      </section>
      {selectedUsersTodos.length > 0 && (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${countActiveTodos} items left`}
        </span>
        <ul className="filters">
          <li>
            <Link
              to="/"
              className={!status ? 'selected' : ''}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              to="/active"
              className={status === 'active' ? 'selected' : ''}
            >
              Active
            </Link>
          </li>
          <li>
            <Link
              to="/completed"
              className={status === 'completed' ? 'selected' : ''}
            >
              Completed
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          hidden={!countCompletedTodos}
          onClick={handleClearAll}
        >
          Clear completed
        </button>
      </footer>
      )}
    </section>
  );
};
