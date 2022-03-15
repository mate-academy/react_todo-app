import PropTypes from 'prop-types';

export const TodoShape = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
