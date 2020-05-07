import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggledCheck, deleteCommand }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggledCheck={checked => toggledCheck(todo.id, checked)}
        deleteCommand={() => deleteCommand(todo.id)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  deleteCommand: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};

export default TodoList;
