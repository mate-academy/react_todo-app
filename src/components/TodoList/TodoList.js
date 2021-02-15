import React from 'react';
import PropTypes from 'prop-types';

import { TodoTypes } from '../Todo/TodoTypes';
import { Todo } from '../Todo';
import { removeTodo } from '../../api/api';

import { getFilteringTodos } from '../../api/helper';

export const TodoList = ({ todos, typeFilteringTodos, onTodosSet }) => {
  const handleChange = (event) => {
    const { checked } = event.target;

    event.persist();
    todos.forEach(todo => removeTodo(todo.id, 'completed', !todo.completed));
    onTodosSet(() => todos.map(todo => ({
      ...todo,
      completed: checked,
    })));
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        checked={!todos.some(todo => !todo.completed)}
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
        {getFilteringTodos(typeFilteringTodos, todos).map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onTodosSet={onTodosSet}
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
  typeFilteringTodos: PropTypes.string.isRequired,
  onTodosSet: PropTypes.func.isRequired,
};
