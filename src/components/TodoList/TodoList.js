import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem, TodoItemProps } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, toggleCompleted, deletetask }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        deletetask={deletetask}
        completed={todo.completed}
        toggleCompleted={toggleCompleted}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      ...TodoItemProps,
    }),
  ).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  deletetask: PropTypes.func.isRequired,
};
