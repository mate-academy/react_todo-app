import PropTypes from 'prop-types';

const tasksShape = PropTypes.shape({
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

export const mainShape = PropTypes.shape({
  tasks: tasksShape,
  completedChange: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  completedAll: PropTypes.func.isRequired,
});

export const footerShape = PropTypes.shape({
  filterClass: PropTypes.arrayOf(PropTypes.string),
  tasks: tasksShape,
  deleteCompleted: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filters: PropTypes.func.isRequired,
});
