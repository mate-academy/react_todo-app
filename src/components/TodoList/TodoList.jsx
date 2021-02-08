import React from 'react';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';
import { Todo } from '../Todo';

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
