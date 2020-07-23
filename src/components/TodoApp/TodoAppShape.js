import PropTypes from 'prop-types';

const TaskTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodoAppTypes = {
  tasksFromServer: PropTypes.arrayOf(
    TaskTypes,
  ),
};
