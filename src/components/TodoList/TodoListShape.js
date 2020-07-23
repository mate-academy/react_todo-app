import PropTypes from 'prop-types';

const TaskTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodoListTypes = {
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
  tab: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onChangeCurrentTask: PropTypes.func.isRequired,
};
