import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TodosFilter } from './TodosFilter';
import { clearCompleted } from '../redux/actions';

const Footer = ({ gotCompleted, todos, clearCompleted: claear }) => (
  <footer className="footer">
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
      items left
    </span>

    <TodosFilter />

    {gotCompleted
      ? (
        <button
          type="button"
          className="clear-completed"
          onClick={claear}
        >
          Clear completed
        </button>
      )
      : ''
      }
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  gotCompleted: PropTypes.bool.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.todos,
  gotCompleted: state.todos.todos.some(
    todo => todo.completed,
  ),
});

export default connect(mapStateToProps, { clearCompleted })(Footer);
