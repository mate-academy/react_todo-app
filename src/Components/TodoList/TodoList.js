import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = (
  { deleteTodo,
    markAsCompleted,
    markAllAsCompleted,
    todos },
) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={markAllAsCompleted}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          todo={todo}
          key={todo.id}
          markAsCompleted={checked => markAsCompleted(todo.id, checked)}
          deleteTodo={deleteTodo}
        />
      ))
      }
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  markAllAsCompleted: PropTypes.func.isRequired,
};
