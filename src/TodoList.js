import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onCheck, onDelete }) => (
  <ul className="todo-list">
    {todos.map(todoItem => (
      <TodoItem
        todo={todoItem}
        key={todoItem.id}
        onCheck={onCheck}
        onDelete={onDelete}
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
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
