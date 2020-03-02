import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {
  const {
    todos,
    onToggleComplete,
    onDelete,
    toggleAllTodo,
    isActiveTodos,
  } = props;

  return (
    <>
      <header className="header">
        <h1>todos</h1>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          name="toggle-all"
          className="toggle-all"
          checked={isActiveTodos}
          onChange={toggleAllTodo}
        />

        { todos.length > 0 && (
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        )}

        <ul
          className="todo-list"
          key={todos.id}
        >
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames({
                completed: todo.completed,
              })}
            >
              <TodoItem
                todo={todo}
                onToggleComplete={
                  () => onToggleComplete(todo.id)
                }
                onDelete={
                  () => onDelete(todo)
                }
              />
              <input
                type="text"
                className="edit"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,

  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleAllTodo: PropTypes.func.isRequired,
  isActiveTodos: PropTypes.bool.isRequired,
};
