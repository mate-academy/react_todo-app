import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, toggledCheck, deleteTask, showWords }) => (
  <ul className="todo-list">
    {todos.map((todo, index) => <Todo key={todo.id} todo={todo} toggledCheck={() => toggledCheck(todo.id)} deleteTask={() => deleteTask(todo.id)} />)}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bull,
    }).isRequired,
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};
