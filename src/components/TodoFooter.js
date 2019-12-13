import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodosFilters from './TodosFilters';

const TodoFooter = (
  { currentFilter, todos, onClearAllCompleted, onSetFilter }
) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className={cn('footer')}>
      <span className={cn('todo-count')}>
        {`${completedTodos} items left`}
      </span>

      <TodosFilters
        onFilter={onSetFilter}
        selectedFilter={currentFilter}
      />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className={cn('clear-completed')}
          onClick={onClearAllCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

TodoFooter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClearAllCompleted: PropTypes.func.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

export default TodoFooter;
