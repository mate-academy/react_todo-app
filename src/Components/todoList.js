import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ list, handleRemove, handleCheck }) => (
  <ul
    className="todo-list"
  >
    {list.map((item, i) => (
      <TodoItem
        key={item.id}
        list={list}
        item={item}
        i={i}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  handleRemove: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  list: [],
};
export default TodoList;
