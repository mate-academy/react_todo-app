import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo/Todo';

const TodoList = ({ items, toggleCompleted, destroyTodo, editTodo }) => (
  <ul className="todo-list">
    {items.map((item, index) => (
      <Todo
        key={item.id}
        index={index}
        item={item}
        toggleCompleted={toggleCompleted}
        editTodo={editTodo}
        destroyTodo={destroyTodo}
      />
    ))}
  </ul>
);

export default TodoList;

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
