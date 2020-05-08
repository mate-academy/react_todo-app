import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ editTodo, todos, onItemClick, deleteItem }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        editTodo={editTodo}
        onItemClick={onItemClick}
        deleteItem={deleteItem}
        key={todo.id}
        {...todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  editTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
  onItemClick: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoList;
