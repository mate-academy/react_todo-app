import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const { handleFlag, todo, onDelete } = props;

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleFlag}
          value={todo.id}
          checked={todo.isCompleted}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          value={todo.id}
          onClick={onDelete}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  handleFlag: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
