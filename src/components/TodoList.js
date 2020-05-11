import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  toggleComplete,
  removeTodo,
  toggleSelectAll,
  editTitleTodo,
}) => (

  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.length > 0 && todos.every(todo => todo.completed)}
      onChange={toggleSelectAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          editTitleTodo={editTitleTodo}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  selectAll: PropTypes.bool.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  editTitleTodo: PropTypes.func.isRequired,
};
