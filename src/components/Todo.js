import React from 'react';
import PropTypes from 'prop-types';

export function Todo({
  title,
  completed,
  id,
  setTodos,
}) {
  // const removeTodo = x => (
  //   setTodos(current => [...current].filter(elem => elem.id === id)));

  return (
    <li>
      <div className={completed ? 'view' : 'completed'}>
        <input type="checkbox" className="toggle" />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          // onClick={removeTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setTodos: PropTypes.func.isRequired,
  // removeTodo: PropTypes.func.isRequired,
};
