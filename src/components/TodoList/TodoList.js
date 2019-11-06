import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.items.map(item => (
        <TodoItem
          item={item}
          key={item.id}
          handleDestroy={props.handleDestroy}
          handleChecked={props.handleChecked}
        />
      ))}
    </ul>
  );
}

TodoList.defaultProps = {
  items: [],
  handleChecked: {},
  handleDestroy: {},
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleChecked: PropTypes.func,
  handleDestroy: PropTypes.func,
};

export default TodoList;
