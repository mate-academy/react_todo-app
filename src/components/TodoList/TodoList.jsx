import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  changeCompleted,
  changeTitle,
  handleDelete,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        {...todo}
        changeTitle={changeTitle}
        handleDelete={handleDelete}
        changeCompleted={changeCompleted}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
