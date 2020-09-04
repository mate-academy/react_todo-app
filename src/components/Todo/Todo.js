import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, allTodos, todosSetter }) => (
  <li className={todo.completed ? 'completed' : null}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => {
          const updatedTodos = allTodos.map((elem) => {
            const current = elem;

            if (current.id === todo.id) {
              current.completed = !current.completed;
            }

            return current;
          });

          todosSetter(updatedTodos);
        }}
      />

      <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>

      <button
        type="button"
        className="destroy"
        onClick={() => {
          const updatedTodos = allTodos
            .filter(current => current.id !== todo.id);

          todosSetter(updatedTodos);
        }}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  allTodos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  todosSetter: PropTypes.func.isRequired,
};
