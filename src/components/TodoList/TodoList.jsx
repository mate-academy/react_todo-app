import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { TypeTodo } from '../../types';

export const TodoList = ({
  removeItem,
  todos,
  checkTodo,
  handleEditingTodo,
  handleEditedTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        className="TodoList"
        key={todo.id}
        removeItem={removeItem}
        checkTodo={checkTodo}
        handleEditingTodo={handleEditingTodo}
        handleEditedTodo={handleEditedTodo}
        todo={todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  removeItem: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  checkTodo: PropTypes.func.isRequired,
  handleEditingTodo: PropTypes.func.isRequired,
  handleEditedTodo: PropTypes.func.isRequired,
};
