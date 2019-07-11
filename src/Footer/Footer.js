import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  selectedPage(page) {
    const { filteredField } = this.props;
    return page === filteredField ? 'selected' : '';
  }

  render() {
    const {
      deleteAllCompleted,
      changeFilter,
      todosLeft,
      completedLength,
    } = this.props;

    const clearBtnClassName = completedLength ? '' : 'clear-completed--disable';

    return (
      <footer className="footer">
        <span className="todo-count">
          {todosLeft} items left
        </span>

        <ul className="filters">
          <li>
            <a
              onClick={e => changeFilter(e)}
              href="#/"
              className={this.selectedPage('')}
            >
              All
            </a>
          </li>

          <li>
            <a
              onClick={e => changeFilter(e)}
              href="#/active"
              className={this.selectedPage('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              onClick={changeFilter}
              href="#/completed"
              className={this.selectedPage('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          onClick={deleteAllCompleted}
          type="button"
          className={`clear-completed ${clearBtnClassName}`}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  deleteAllCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  todosLeft: PropTypes.number.isRequired,
  completedLength: PropTypes.number.isRequired,
  filteredField: PropTypes.string.isRequired,
};

export default Footer;
