import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList';

const todosData = [
  { status: 'all', id: +new Date(), title: 'All' },
  { status: 'active', id: +new Date(), title: 'Active' },
  { status: 'completed', id: +new Date(), title: 'Completed' },
];

export const TodoFilter = ({
  todos,
  clearCompletedTodos,
}) => {
  console.log(todosData)

  return (
    <footer className="footer">
      <span className="todo-count">
        {todos.filter(todo => (
          !todo.completed)).length > 0
          ? `${todos.filter(todo => (!todo.completed)).length} not completed`
          : `all done`}
      </span>

      <ul className="filters">
        {todosData.map(todo => (
          <li key={todo.id}>
            <NavLink
              to={TodoList.link({ status: todo.status })}
              activeClassName="selected"
            >
              {todo.title}
            </NavLink>
          </li>
        ))}
      </ul>

      {todos.some(todo => todo.completed) && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
      )}
    </footer>
  );
};

TodoFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
    }),
  ),
  clearCompletedTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

TodoFilter.defaultProps = {
  todos: [],
};
