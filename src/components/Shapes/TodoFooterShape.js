import PropTypes from 'prop-types';

export const TodoFooterShape = PropTypes.shape({
  remainedTasks: PropTypes.number.isRequired,
  handleShowActive: PropTypes.func.isRequired,
  handleShowCompleted: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  generalList: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
});
