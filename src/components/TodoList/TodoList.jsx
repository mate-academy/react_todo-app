import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.map(({ id, title, completed }) => (
      <TodoItem
        key={id}
        id={id}
        title={title}
        completed={completed}
      />
    )).reverse()}
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
