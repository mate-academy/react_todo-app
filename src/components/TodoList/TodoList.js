import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({
  todos,
  removeTodo,
  toggleSetCompleted,
  toggleSetAllCompleted,
}) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={evt => toggleSetAllCompleted(evt.target.checked)}
      checked={todos.length && todos.every(todo => todo.completed)}
    />
    {todos.length !== 0
      && <label htmlFor="toggle-all">Mark all as complete</label>}
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          todo={todo}
          toggleSetCompleted={toggleSetCompleted}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,

  toggleSetCompleted: PropTypes.func.isRequired,
  toggleSetAllCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
