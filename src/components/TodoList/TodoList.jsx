import React from 'react';
import { Route } from 'react-router-hoc';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

const TodoListRoute = Route({
  status: Route.params.enum('all', 'active', 'completed'),
}, ({ status }) => `/${status}`);

export const TodoList = TodoListRoute(({
  todos,
  onComplete,
  onToggle,
  onRemove,
  match: { params: { status } },
}) => {
  const isComplete = todos.every(todo => todo.completed);

  return (
    <>
      <input
        type="checkbox"
        readOnly
        id="toggle-all"
        className="toggle-all"
        onClick={() => onToggle(isComplete)}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
      <ul className="todo-list">
        {todos.filter((todo) => {
          if (status === 'completed') {
            return todo.completed;
          }

          if (status === 'all') {
            return todo;
          }

          return !todo.completed;
        }).map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={onComplete}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </>
  );
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
