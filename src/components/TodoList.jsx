import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ items, checkTodo, removeTodo, updateTitle }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        checkTodo={checkTodo}
        removeTodo={removeTodo}
        updateTitle={updateTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
