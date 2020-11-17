import PropTypes from 'prop-types';

export const InputShape = {
  id: PropTypes.number,
  completed: PropTypes.bool,
  handleChecked: PropTypes.func.isRequired,
};
