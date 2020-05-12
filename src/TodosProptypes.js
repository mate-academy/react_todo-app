import PropTypes from 'prop-types';

const TodosProptypes
  = PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired;

export default TodosProptypes;
