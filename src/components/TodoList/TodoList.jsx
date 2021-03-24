import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(item => (
      <TodoItem
        id={item.id}
        title={item.title}
        completed={item.completed}
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
    }),
  ).isRequired,
};
