import React from 'react';
import PropTypes from 'prop-types';

import { TodoTypes } from '../TodoItem/TodoTypes';
import { TodoItem } from '../TodoItem';
import { removeTodo } from '../../api/api';

export const TodoList = ({ todos, onSetTodos }) => {
  const handleChange = (event) => {
    event.persist();
    todos.forEach(todo => removeTodo(todo.id, 'completed', !todo.completed));
    onSetTodos(() => todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    })));
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={handleChange}
      />
      <label
        htmlFor="toggle-all"
        hidden={todos.length === 0}
      >
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSetTodos={onSetTodos}
          />
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoTypes),
  ).isRequired,
  onSetTodos: PropTypes.func.isRequired,
};
