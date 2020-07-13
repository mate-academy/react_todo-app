import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoShape } from '../Shapes/Shapes';

export function TodoList({ todos, toggleAllTodos }) {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={() => toggleAllTodos(todos)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
};
