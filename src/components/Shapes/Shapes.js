import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const Todos = PropTypes.arrayOf(TodoShape);
