import React from 'react';

import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const _ = require('lodash');

const TodoList = ({
  todoListFiltered,
  toggleCompleteStatus,
  toggleRemoveTodo,
  toggleEditTodo,
}) => (
  <ul className="todo-list">
    {
      todoListFiltered.map(todo => (
        <TodoItem
          todo={todo}
          toggleCompleteStatus={toggleCompleteStatus}
          toggleRemoveTodo={toggleRemoveTodo}
          toggleEditTodo={toggleEditTodo}
          key={_.uniqueId('todo-item_')}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todoListFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.string,
    })
  ).isRequired,
  toggleCompleteStatus: PropTypes.func.isRequired,
  toggleRemoveTodo: PropTypes.func.isRequired,
  toggleEditTodo: PropTypes.func.isRequired,
};

export default TodoList;
