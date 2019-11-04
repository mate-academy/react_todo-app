import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodosFilter from '../TodosFilter/TodosFilter';

class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {this.props.items.filter(item => item.completed === false).length}
          {' '}
          items left
        </span>

        <TodosFilter />

        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
          onClick={this.props.handleClear}
        >
        Clear completed
        </button>
      </footer>
    );
  }
}

AppFooter.defaultProps = {
  items: [],
  handleClear: {},
};

AppFooter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleClear: PropTypes.func,
};

export default AppFooter;
