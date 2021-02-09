import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  onStatusChange,
  deleteTodo,
  updateTitle,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onStatusChange={onStatusChange}
        deleteTodo={deleteTodo}
        updateTitle={updateTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
