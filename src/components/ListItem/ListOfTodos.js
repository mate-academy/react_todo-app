import React from 'react';
import PropTypes from 'prop-types';

const ListOfTodos = ({ listOfTodos, toggleTodoState, removeTodo }) => (
  <ul className="todo-list">
    {listOfTodos.map((todo, i) => (
      <li className={todo.isChecked ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${i}`}
            checked={todo.isChecked}
            onChange={() => toggleTodoState(i)}
          />
          <label htmlFor={`todo-${i}`} id="todo">
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(i)}
          />
        </div>
      </li>
    ))}
  </ul>
);

ListOfTodos.propTypes = {
  listOfTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isChecked: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  toggleTodoState: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default ListOfTodos;
