import PropTypes from 'prop-types';

export const TypeTodo = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
});
