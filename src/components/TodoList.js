import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = props => (
  <ul className="todo-list">
    {props.todoListCopy.map(todo => (
      <Todo {...props} todo={todo} key={todo.id} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todoListCopy: PropTypes.arrayOf(PropTypes.object).isRequired,
};
