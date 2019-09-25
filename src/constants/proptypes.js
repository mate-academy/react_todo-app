import PropTypes from 'prop-types';

export const TodoListItemProps = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmitEditedChange: PropTypes.func.isRequired,
};

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmitEditedChange: PropTypes.func,
};
