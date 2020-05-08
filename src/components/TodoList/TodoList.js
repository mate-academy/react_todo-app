import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ visibleTodos, deleteTodo, completedTodo }) => (
  <section className="main">
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {visibleTodos.map(item => (
        <TodoItem
          {...item}
          deleteTodo={deleteTodo}
          completedTodo={completedTodo}
          key={item.id}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
};

TodoList.defaultProps = {
  visibleTodos: [],
};
