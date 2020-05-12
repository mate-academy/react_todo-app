import PropTypes from 'prop-types';

export const todoType = PropTypes.shape({
  id: PropTypes.number,
  completed: PropTypes.bool,
  isEditable: PropTypes.bool,
  title: PropTypes.string,
});
