import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../common/Context';

export const TodoItem = ({ isCompleted, id, title }) => {
  const { setTodoCompleted, removeTodo } = useContext(Context);

  const handleChange = (event) => {
    setTodoCompleted(id, event.target.checked);
  };

  const destroy = () => {
    removeTodo(id);
  };

  return (
    <li className={isCompleted ? 'completed' : ''}>
      <div>
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={handleChange}
          checked={isCompleted}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={destroy}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
