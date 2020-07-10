import React from 'react';
import PropTypes from 'prop-types';
import TodoFilter from './TodoFilter';

const TodoFooter
  = ({ todos, currentFilter, setFilter, onClearTodos }) => (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(item => !item.completed).length} items left`}
      </span>
      <ul className="filters">
        <TodoFilter
          onClick={() => setFilter('all')}
          filterType={currentFilter}
        >
          All
        </TodoFilter>
        <TodoFilter
          onClick={() => setFilter('active')}
          filterType={currentFilter}
        >
          Active
        </TodoFilter>
        <TodoFilter
          onClick={() => setFilter('completed')}
          filterType={currentFilter}
        >
          Completed
        </TodoFilter>
      </ul>
      {todos.some(item => item.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );

TodoFooter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  onClearTodos: PropTypes.func.isRequired,
};

export default TodoFooter;
