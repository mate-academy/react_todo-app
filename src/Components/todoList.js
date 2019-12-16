import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ list }) => (
  <ul
    className="todo-list"
  >
    {list.map((item, i) => (
      <TodoItem key={item.id} list={list} item={item} i={i} />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  list: [],
};
export default TodoList;
