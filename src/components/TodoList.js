import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoItem from './TodoItem';

const TodoList = ({ visibleTodos, handleRemoveTodo, statusOfTodo }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {visibleTodos.map(todo => (
        <li
          className={cn({
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            statusOfTodo={statusOfTodo}
          />
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  statusOfTodo: PropTypes.func.isRequired,
};

export default TodoList;
