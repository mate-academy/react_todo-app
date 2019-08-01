import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';
import filteredForField from './filteredForField';

const Footer = ({
  handleFilterBy, sortField, todos, isCompletedHide, destroyAllComplete,
}) => {
  const todosVisible = filteredForField(todos, sortField);

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todosVisible.filter(todo => !todo.completed).length}
        items left`}
      </span>

      <ul className="filters">
        <TodosFilter
          sortField={sortField}
          handleFilterBy={handleFilterBy}
        />
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={destroyAllComplete}
      >
        {isCompletedHide ? 'Clear completed' : ''}
      </button>
    </footer>
  );
};

Footer.propTypes = {
  sortField: PropTypes.string.isRequired,
  handleFilterBy: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
  isCompletedHide: PropTypes.number.isRequired,
  destroyAllComplete: PropTypes.func.isRequired,
};

export default Footer;
