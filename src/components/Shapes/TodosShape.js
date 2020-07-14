import PropTypes from 'prop-types';

export const TodosShape = PropTypes.arrayOf(
  PropTypes.shape({
    todo: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }),
).isRequired;
