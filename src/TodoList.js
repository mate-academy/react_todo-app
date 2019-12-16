import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleDelete, handleCheck }) => (
  <ul className="todo-list">
    {todos.map(todoItem => (
      <TodoItem
        todo={todoItem}
        key={todoItem.id}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoList;
