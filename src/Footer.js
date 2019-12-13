import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = ({
  todos,
  handlerFilterAll,
  handlerFilterActive,
  handlerFilterCompleted,
  handlerClearCompleted,
}) => (

  <footer
    className="footer"
    style={todos.length > 0 ? { display: 'block' } : { display: 'none' }}
  >
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
items left
    </span>

    <TodosFilter
      handlerFilterAll={handlerFilterAll}
      handlerFilterActive={handlerFilterActive}
      handlerFilterCompleted={handlerFilterCompleted}
    />

    <button
      type="button"
      className="clear-completed"
      onClick={handlerClearCompleted}
      style={todos.filter(todo => todo.completed).length > 0
        ? { display: 'block' }
        : { display: 'none' }}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlerFilterAll: PropTypes.func.isRequired,
  handlerFilterActive: PropTypes.func.isRequired,
  handlerFilterCompleted: PropTypes.func.isRequired,
  handlerClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
