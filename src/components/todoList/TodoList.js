import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem/TodoItem';

function TodoList({ todoList, deleteItem, isCompleted }) {
  return (
    <ul className="todo-list">
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteItem}
          isCompleted={isCompleted}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default TodoList;
