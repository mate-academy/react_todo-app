import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { TodoShape } from './TodoShape';

export const TodoList = ({ todos, handleCheck, handleDelete }) => (
  <ul className="todo-list">
    {
      todos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          onCheck={handleCheck}
          onDelete={handleDelete}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape),
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
