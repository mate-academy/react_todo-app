import PropTypes from 'prop-types';

const todos = PropTypes.shape({
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

// eslint-disable-next-line import/prefer-default-export
export const FooterProps = {
  activeFilter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  todosList: PropTypes.arrayOf(PropTypes.shape(todos)).isRequired,
};

const todo = PropTypes.object({
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodosListProps = {
  isChecked: PropTypes.bool.isRequired,
  destroy: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  todo: PropTypes.objectOf(PropTypes.object(todo)).isRequired,
};
