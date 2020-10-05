import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        title={todo.title}
        id={todo.id}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
