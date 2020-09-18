import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos, onStatusChange }) => {
  const onToggle = (todoId) => {
    onStatusChange(todoId);
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
