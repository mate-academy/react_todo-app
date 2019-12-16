import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ list }) => (
  <ul
    className="todo-list"
  >
    <TodoItem list={list} />
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  list: [],
};
export default TodoList;
