import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  isCompleted: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
});
