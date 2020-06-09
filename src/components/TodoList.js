import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({
  todos,
  editCurrentTitle,
  deleteTodo,
  changeStatus,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        todo={todo}
        key={todo.id}
        id={todo.id}
        deleteTodo={deleteTodo}
        changeStatus={changeStatus}
        editCurrentTitle={editCurrentTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  editCurrentTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
