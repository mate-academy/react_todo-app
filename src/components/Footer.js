import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

export const Footer = ({
  todos,
  clearCompletedTodo,
  todosToShow,
  toggleActiveTodos,
  filterTodos,
}) => {
  const filteringBtns = ['all', 'active', 'completed'];

  return (
    <footer className="footer">
      <span className="todo-count">
        {todos.filter(todo => !todo.isTodoCompleted).length}
        {' '}
        items left
      </span>

      <ul className="filters">
        {filteringBtns.map(filter => (
          <TodosFilter
            todosToShow={todosToShow}
            key={filter}
            actualFilter={filter}
            toggleActiveTodos={toggleActiveTodos}
            filterTodos={filterTodos}
          />
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    isTodoCompleted: PropTypes.bool,
  })).isRequired,
  clearCompletedTodo: PropTypes.func.isRequired,
  todosToShow: PropTypes.string.isRequired,
  toggleActiveTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};
