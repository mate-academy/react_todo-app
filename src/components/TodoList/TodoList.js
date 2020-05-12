import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todoList, handleToggleStatus, removeTodoItem }) => (

  <ul className="todo-list">
    {todoList.map(todoItem => (
      <TodoItem
        {...todoItem}
        handleToggleStatus={handleToggleStatus}
        removeTodoItem={removeTodoItem}
        key={todoItem.id}
      />
    ))}
  </ul>

);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleToggleStatus: PropTypes.func.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
};
