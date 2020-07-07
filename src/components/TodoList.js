import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos, deleteTodo, toggleCheck }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        toggleCheck={toggleCheck}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired,
};
