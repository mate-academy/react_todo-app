import React from 'react';
import PropTypes from 'prop-types';
import TodoFilter from '../TodoFilter';

function Footer(props) {
  const {
    todoList,
    todosFilter,
    selectedPage,
    clearCompleted,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {todoList.filter(todo => (
          !todo.completed
        )).length}
      </span>
      <span className="todo-count">items left</span>

      <TodoFilter
        todosFilter={todosFilter}
        selectedPage={selectedPage}
      />

      {todoList.some(todo => todo.completed)
      && (
        <button
          type="button"
          onClick={clearCompleted}
          className="clear-completed"
          style={{ display: 'block' }}
        >
          Clear completed
        </button>
      )
      }
    </footer>
  );
}

Footer.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  todosFilter: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
