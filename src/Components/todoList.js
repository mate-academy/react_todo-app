import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ list, handleRemove }) => (
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
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  handleRemove: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  list: [],
};
export default TodoList;
