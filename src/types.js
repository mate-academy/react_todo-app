import PropTypes from 'prop-types';

export const TypeTodo = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
});
