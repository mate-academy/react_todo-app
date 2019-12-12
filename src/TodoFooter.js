import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { FILTERS } from './App';
import TodoFilter from './TodoFilter';

const TodoFooter = ({
  todosLeft,
  todos,
  clearCompletedTodos,
  setFilter,
  currentFilter,
}) => (
  <footer
    className={cn('footer')}
    style={{ display: 'block' }}
  >
    <span className={cn('todo-count')}>
      {todosLeft}
      {' '}
          items left
    </span>

    <ul className={cn('filters')}>
      {Object.values(FILTERS).map(value => (
        <TodoFilter
          key={value}
          filter={value}
          setFilter={setFilter}
          isFilterSelect={value === currentFilter}
        />
      ))}
    </ul>

    <button
      onClick={clearCompletedTodos}
      type="button"
      className={cn('clear-completed')}
      style={{ display: 'block' }}
    >
      {todos.some(todo => todo.completed) && 'Clear Completed'}
    </button>
  </footer>
);

TodoFooter.propTypes = {
  todosLeft: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.func.isRequired,
};

export default TodoFooter;
