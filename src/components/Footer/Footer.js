import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FilterList } from '../FilterList';

export const Footer = (
  { currentFilter, todos, onClearCompleted, onSetFilter },
) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className={cn('footer')}>
      <span className={cn('todo-count')}>
        {`${completedTodos} items left`}
      </span>

      <FilterList
        onFilter={onSetFilter}
        selectedFilter={currentFilter}
      />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className={cn('clear-completed')}
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};
