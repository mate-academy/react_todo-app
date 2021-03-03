import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const ToDoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
      />
    ))}
  </ul>
);

ToDoList.propTypes = {
  todos: PropTypes.objectOf().isRequired,
};
