import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, deletedTodo, toggleAll, checkedTodo }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={() => toggleAll()}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">

      {todos.map(todo => (
        <Todo
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          checkedTodo={checkedTodo}
          deletedTodo={deletedTodo}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  deletedTodo: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  checkedTodo: PropTypes.func.isRequired,
};
