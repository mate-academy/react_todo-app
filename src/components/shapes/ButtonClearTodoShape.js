import PropTypes from 'prop-types';

export const ButtonClearTodoShape = {
  id: PropTypes.number,
  deleteTodo: PropTypes.func.isRequired,
};
