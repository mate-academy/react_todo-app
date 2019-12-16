import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const TodoFooter = ({
  todos,
  toggleFilterIdentifier,
  removeCompletedTodos,
  filterIdentifier,
  amountOfActiveTodos,
}) => (
  <section className="footer">
    <span className="todo-count">
      {amountOfActiveTodos}
      {' '}
      {amountOfActiveTodos === 1
        ? 'item left'
        : 'items left'
      }
    </span>
    <TodosFilter
      todos={todos}
      filterIdentifier={filterIdentifier}
      toggleFilterIdentifier={toggleFilterIdentifier}
      removeCompletedTodos={removeCompletedTodos}
    />
  </section>
);

TodoFooter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  filterIdentifier: PropTypes.string.isRequired,
  amountOfActiveTodos: PropTypes.number.isRequired,
  toggleFilterIdentifier: PropTypes.func.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
};

export default TodoFooter;
