/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem/TodoItem';

export const TodoList = ({ todos, onDeleteTodo }) => {

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todos && todos.map((todo, idx) => (
          <TodoItem key={idx} todo={todo} idx={idx} onDeleteTodo={onDeleteTodo} />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  onDeleteTodo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  })),
};

