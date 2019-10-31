import React from 'react';
import Filter from '../filter/Filter';
import PropTypes from 'prop-types';

class Footer extends React.Component {

  clearCompletedTitle = () => {
    const { todoList } = this.props;
    return todoList
      .some(todo => todo.status === true)
  }

  render () {
    const {
      todoListLength,
      clearCompleted,
      activeFilter,
      handleActiveFilter
    } = this.props;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {todoListLength} items left
        </span>
        <Filter
          activeFilter={activeFilter}
          handleActiveFilter={handleActiveFilter}
        />
        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
          onClick={() => clearCompleted()}
        >
        {this.clearCompletedTitle() ? 'Clear completed' : ''}
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  todoListLength: PropTypes.number.isRequired,
  todoList: PropTypes.array.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleActiveFilter: PropTypes.func.isRequired
}

export default Footer;
