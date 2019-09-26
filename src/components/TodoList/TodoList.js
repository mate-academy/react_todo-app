import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, toggleComplete, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  })).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
