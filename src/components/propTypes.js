import PropTypes from 'prop-types';

export const todosPropTypes = PropTypes.arrayOf(PropTypes.shape(
  {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  },
));
