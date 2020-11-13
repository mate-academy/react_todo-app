import PropTypes from 'prop-types';

export const ButtonClearTodoShape = {
  id: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
