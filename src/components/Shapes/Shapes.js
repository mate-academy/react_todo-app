import PropTypes from 'prop-types';

export const InputTypes = PropTypes.shape({
  addTask: PropTypes.func.isRequired,
});

export const TaskTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodoAppTypes = PropTypes.shape({
  tasks: PropTypes.arrayOf(
    TaskTypes,
  ),
  addTask: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
});

export const TodoListTypes = PropTypes.shape({
  items: PropTypes.arrayOf(
    TaskTypes,
  ),
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
});

export const TodoItemTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
});

export const TodosFilterTypes = PropTypes.shape({
  onActive: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
});
