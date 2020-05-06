import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({
  todos,
  tempTitle,
  editCurrentTitle,
  handleEditingTitle,
  editTodo,
  deleteTodo,
  changeStatus,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        todo={todo}
        tempTitle={tempTitle}
        key={todo.id}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        changeStatus={changeStatus}
        editCurrentTitle={editCurrentTitle}
        handleEditingTitle={handleEditingTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  tempTitle: PropTypes.string.isRequired,
  editCurrentTitle: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleEditingTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
