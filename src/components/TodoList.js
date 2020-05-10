import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  selectAll,
  toggleComplete,
  removeTodo,
  toggleSelectAll,
  // completedStatus,
}) => (

  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      // checked={completedStatus}
      checked={todos.length > 0 && todos.every(todo => todo.completed)}
      // onChange={() => toggleSelectAll(selectAll)}
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
          // editTodo={editTodo}
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
};
