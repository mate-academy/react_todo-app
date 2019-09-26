import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, deleteTodo, checkBoxClick }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        checkBoxClick={checkBoxClick}
        deleteTodo={deleteTodo}
        key={todo.id}
      />
    ))}
  </ul>
);

PropTypes.TodoList = {
  todos: PropTypes.shape({
    todo: PropTypes.object.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkBoxClick: PropTypes.func.isRequired,
};

export default TodoList;
