import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, deleteTodo, changeStatus }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        todo={todo}
        key={todo.id}
        deleteTodo={deleteTodo}
        changeStatus={changeStatus}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
