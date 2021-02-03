/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Header} from "../Header/Header";

export const TodoList = ({ todos, onDeleteTodo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target.value;

    setIsChecked({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  console.log(isChecked);

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
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.select}
                onChange={handleChange}
              />
              <label>{todo.title}</label>
              <button
                onClick={() => onDeleteTodo(idx)}
                type="button"
                className="destroy"
              />
            </div>
            <input type="text" className="edit" />
          </li>
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

