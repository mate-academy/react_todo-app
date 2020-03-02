import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, toggledCheck, deleteTask }) => (
  <ul className="todo-list">
    {todos.map((todo, index) => (
      <Todo
        key={todo.id}
        todo={todo}
        toggledCheck={checked => toggledCheck(todo.id, checked)}
        deleteTask={() => deleteTask(todo.id)}
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
  deleteTask: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};
