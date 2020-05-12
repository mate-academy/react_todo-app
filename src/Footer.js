import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import FilterButtons from './FilterButtons';
import TodosProptypes from './TodosProptypes';

function Footer({ todos, currentFilter, todosFilter, clearCompleted }) {
  const notComplitedTodo = todos.filter(todo => !todo.completed);

  return (
    <footer
      className={classNames('footer', { activeClear: todos.length === 0 })}
    >
      <span className="todo-count">
        {notComplitedTodo.length}
        {' '}
        items left
      </span>

      <FilterButtons
        todosFilter={todosFilter}
        currentFilter={currentFilter}
      />

      <button
        type="button"
        className={classNames('clear-completed',
          { activeClear: todos.length === notComplitedTodo.length })}
        onClick={clearCompleted}
      >
        Clear completed
      </button>

    </footer>
  );
}

Footer.propTypes = {
  todos: TodosProptypes,
  clearCompleted: PropTypes.func.isRequired,
  todosFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  todos: [],
};

export default Footer;
