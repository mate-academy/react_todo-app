import PropTypes from 'prop-types';
import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, deleteTodo, toggleTodoComplete }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        toggleTodoComplete={toggleTodoComplete}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  deleteTodo: PropTypes.func.isRequired,
  toggleTodoComplete: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
