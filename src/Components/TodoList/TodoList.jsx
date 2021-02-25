import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ items, changeChecked, deleteTodo, changeTitle }) => (
  <ul className="todo-list">
    {
      items.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          changeChecked={changeChecked}
          deleteTodo={deleteTodo}
          changeTitle={changeTitle}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  changeChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};
