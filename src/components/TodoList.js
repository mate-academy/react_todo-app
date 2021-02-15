import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, onToggle, onDelete, onSubmit }) => (
  <ul className="todo-list">
    {[...todos].map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
