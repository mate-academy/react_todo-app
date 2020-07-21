import PropTypes from 'prop-types';

export const InputTypes = {
  addTask: PropTypes.func.isRequired,
};

export const TaskTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodoAppTypes = {
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
};

export const TodoListTypes = {
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
  showOnlyActive: PropTypes.bool.isRequired,
  showOnlyCompleted: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onChangeCurrentTask: PropTypes.func.isRequired,
};

export const TodoItemTypes = {
  id: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onChangeCurrentTask: PropTypes.func.isRequired,
};

export const TodosFilterTypes = {
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
  onToggleTask: PropTypes.func.isRequired,
  showOnlyActive: PropTypes.bool.isRequired,
  showOnlyCompleted: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
};
