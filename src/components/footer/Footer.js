import React from 'react';
import TodosFilter from '../todosFilter/TodosFilter';
import PropTypes from 'prop-types';

function Footer(
  {
    todoList,
    todosFilter,
    selectedPage,
    clearCompleted
  }
) {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {todoList.filter(todo => (
          !todo.completed
        )).length}
      </span>
      <span className="todo-count">items left</span>

      <TodosFilter
        todosFilter={todosFilter}
        selectedPage={selectedPage}
      />

      {todoList.some(todo => todo.completed)
        ? <button
            type="button"
            onClick={clearCompleted}
            className="clear-completed"
            style={{ display: 'block' }}
          >
            Clear completed
          </button>
        : <button
            type="button"
            className="clear-completed"
            style={{ display: 'none' }}
          >
            Clear completed
          </button>
      }
    </footer>
  );
}

Footer.propTypes = {
  todoList: PropTypes.object.isRequired,
  todosFilter: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
