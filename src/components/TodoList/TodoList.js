import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { TodoListItem } from '../TodoListItem/TodoListItem';

export const TodoList = ({ list, deleteItem, switchTaskStatus }) => (
  <ul className="todo-list">
    {list.map(item => (
      <TodoListItem
        key={item.id}
        id={item.id}
        task={item.title}
        status={item.status}
        checked={item.checked}
        deleteItem={deleteItem}
        switchTaskStatus={switchTaskStatus}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func.isRequired,
  switchTaskStatus: PropTypes.func.isRequired,
};
