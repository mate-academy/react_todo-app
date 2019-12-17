import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, checkboxChange, deleteTodo }) => (
  todos.map(item => (
    <Todo
      todo={item}
      checkboxChange={checkboxChange}
      deleteTodo={deleteTodo}
      key={item.id}
    />
  ))
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
