import React from 'react';
import PropTypes from 'prop-types';
import TodosFilters from './TodosFilter';

const TodoFooter = ({
  todos,
  onSetFilter,
  currentFilter,
  removeCompletedTodos,
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
    <TodosFilters
      todos={todos}
      setFilter={onSetFilter}
      currentFilter={currentFilter}
      removeCompletedTodos={removeCompletedTodos}
    />
  </section>
);

TodoFooter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  amountOfActiveTodos: PropTypes.number.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
};

export default TodoFooter;
