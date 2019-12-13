import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleCheck, handleDelete }) => (
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
  todos: PropTypes
    .arrayOf(PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoList;
