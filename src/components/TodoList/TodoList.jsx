import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  changeStatus,
  deleteTodo,
  changeTitle,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        {...todo}
        changeStatus={changeStatus}
        deleteTodo={deleteTodo}
        changeTitle={changeTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
