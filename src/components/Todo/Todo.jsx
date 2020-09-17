import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ item, handleStatus, setTodos }) => {
  const destroyTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <li className={cn({ completed: item.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => handleStatus(item.id)}
        />
        <label>{item.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroyTodo(item.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleStatus: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
