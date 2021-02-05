import React from 'react';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';
import { Todo } from '../Todo';

export const TodoList = ({
  removeItem,
  todos,
  toggleCompletedStatus,
  handleEditingTodo,
  handleEnter,
  handleEscape,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        handleEscape={handleEscape}
        key={todo.id}
        removeItem={removeItem}
        toggleCompletedStatus={toggleCompletedStatus}
        handleEditingTodo={handleEditingTodo}
        handleEnter={handleEnter}
        todo={todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  removeItem: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  toggleCompletedStatus: PropTypes.func.isRequired,
  handleEditingTodo: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  handleEscape: PropTypes.func.isRequired,
};
