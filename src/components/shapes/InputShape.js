import PropTypes from 'prop-types';

export const InputShape = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
};
