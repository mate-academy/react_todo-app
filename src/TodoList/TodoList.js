import React from 'react';
import PropTypes from 'prop-types';

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

      {todos.map((todo, index) => (
        <li key={todos[index]}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.comleted}
              onClick={() => checkedTodo(index)}
            />
            <label
              htmlFor={`todo-${index}`}
              className={todo.comleted ? '' : ''}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => deletedTodo(todo.id)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      comleted: PropTypes.bool,
    }),
  ).isRequired,
  deletedTodo: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  checkedTodo: PropTypes.func.isRequired,
};
