import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';
import '../../styles/todo-list.css';

export const TodoList = ({ items, setTodos }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        item={item}
        key={item.id}
        setTodos={setTodos}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setTodos: PropTypes.func.isRequired,
};
