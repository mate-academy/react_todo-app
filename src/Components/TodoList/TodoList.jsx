import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ items, changeChecked, deleteTodo }) => (
  <ul className="todo-list">
    {
      items.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          changeChecked={changeChecked}
          deleteTodo={deleteTodo}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  changeChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
