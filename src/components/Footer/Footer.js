import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from '../TodosFilter/TodosFilter';

const Footer = (
  {
    todos,
    itemLeft,
    updateTodosShow,
    handleRemoveCompleted,
  },
) => (

  <footer className="footer">
    <span className="todo-count">
      {itemLeft}
      item left
    </span>
    <TodosFilter updateTodosToShow={updateTodosShow} />
    {
      (todos.filter(todo => (
        todo.completed)).length)
        ? (
          <button
            onClick={handleRemoveCompleted}
            type="button"
            className="clear-completed"
          >
            Clear completed
          </button>
        )
        : ('')
    }
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  itemLeft: PropTypes.number.isRequired,
  updateTodosShow: PropTypes.func.isRequired,
  handleRemoveCompleted: PropTypes.func.isRequired,
};

export default Footer;
