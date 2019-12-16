import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, handleDelete, handleCheck }) => (
  <ul className="todo-list">
    {filteredTodos.map(todoItem => (
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
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoList;
