import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  addTodo,
  changeAllTodosStatus,
  deleteTodo,
} from '../features/todos/todosSlice';

import TodoFilter from './TodoFilter';

const TodoApp = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { todos } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const notCompletedTodos = todos.filter(todo => todo.completed === false);

  const handleSubmit = () => {
    if (!newTodoTitle.trim('').length) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setNewTodoTitle('');
  };

  const handleToggleAllTodosStatus = () => {
    dispatch(changeAllTodosStatus());
  };

  const handleClearCompletedToods = () => {
    const completedTodos = todos.filter(todo => todo.completed === true);

    completedTodos.forEach(todo => dispatch(deleteTodo(todo.id)));
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.some(todo => todo.completed === false)}
          onClick={handleToggleAllTodosStatus}
        />
        <label
          hidden={todos.length === 0}
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>
        <TodoFilter />
      </section>

      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count">
            {`${notCompletedTodos.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => classNames({ selected: isActive })}
              >
                All
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/active"
                className={({ isActive }) => classNames({ selected: isActive })}
              >
                Active
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/completed"
                className={({ isActive }) => classNames({ selected: isActive })}
              >
                Completed
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            hidden={todos.every(todo => todo.completed === false)}
            onClick={handleClearCompletedToods}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

export default TodoApp;
