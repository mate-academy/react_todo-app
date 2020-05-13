import React from 'react';

import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, removeTodo, changeStatus }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        changeStatus={changeStatus}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
};
