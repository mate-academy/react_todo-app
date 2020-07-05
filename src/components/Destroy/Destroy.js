import React from 'react';
import PropTypes from 'prop-types';

const Destroy = ({ id, destroyTodo }) => (
  <button
    type="button"
    className="destroy"
    onClick={() => destroyTodo(id)}
  />
);

export default Destroy;

Destroy.propTypes = {
  id: PropTypes.number.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
