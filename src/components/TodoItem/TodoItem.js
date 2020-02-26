import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const { todo, deleteTodo, handleCompleted } = props;
  const { title, id } = todo;

  return (
    <>
      <div className="view">
        <input
          onChange={() => handleCompleted(id)}
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
        />
        <label htmlFor={`todo-${id}`}>{title}</label>
        <button
          onClick={() => deleteTodo(id)}
          type="button"
          className="destroy"
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    check: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func,
  handleCompleted: PropTypes.func,
};

TodoItem.defaultProps = {
  deleteTodo: () => {},
  handleCompleted: () => {},
};
