import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ visibleTodos }) => (
  <ul className="todo-list">
    {visibleTodos.map(todo => <TodoItem todo={todo} />)}

  </ul>
);

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bul,
    title: PropTypes.string,
  })),
};

TodoList.defaultProps = {
  visibleTodos: [],
};
