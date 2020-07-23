import PropTypes from 'prop-types';

const TaskTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodosFilterTypes = {
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
  onToggleShowedTask: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
};
