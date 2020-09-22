import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  filteredTodos,
  changeStatusAll,
  changeTodo,
  deleteTodo,
}) => (
  <section className="main">

    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.every(todo => todo.completed)}
      onChange={() => {
        changeStatusAll();
      }}
    />

    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          id={todo.id}
          completed={todo.completed}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  changeTodo: PropTypes.func.isRequired,
  changeStatusAll: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
