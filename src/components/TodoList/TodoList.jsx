import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  completeTodo,
  completeTodos,
  removeTodo,
}) => (
  <>
    <input
      type="checkbox"
      readOnly
      id="toggle-all"
      className="toggle-all"
      onClick={completeTodos}
    />
    <label htmlFor="toggle-all">
      Mark all as complete
    </label>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  completeTodo: PropTypes.func.isRequired,
  completeTodos: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
