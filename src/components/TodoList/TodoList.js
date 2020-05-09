import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todoList }) => (

  <ul className="todo-list">
    {todoList.map(todoItem => (
      <TodoItem {...todoItem} />
    ))}
  </ul>

);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
