import React from 'react';
import PropTypes from 'prop-types';

export class FooterBar extends React.Component {
  state = {
    selected: {
      all: true,
      active: false,
      completed: false,
    },
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.filterTodos(event.target.name);
    this.setSelect(event.target.name);
  }

  setSelect = (select) => {
    const { selected } = this.state;

    const newSelected = Object.keys({ ...selected }).reduce((acc, key) => ({
      ...acc,
      [key]: key === select,
    }), {});

    this.setState(({
      selected: { ...newSelected },
    }));
  }

  render() {
    const { all, active, completed } = this.state.selected;

    return (
      <footer className="footer">
        <span className="todo-count">
            3 items left
        </span>

        <ul className="filters">
          <li>
            <a
              name="all"
              href="#/"
              className={all ? 'selected' : undefined}
              onClick={this.handleClick}
            >
              All
            </a>
          </li>

          <li>
            <a
              name="active"
              href="#/active"
              className={active ? 'selected' : undefined}
              onClick={this.handleClick}
            >
              Active
            </a>
          </li>

          <li>
            <a
              name="completed"
              href="#/completed"
              className={completed ? 'selected' : undefined}
              onClick={this.handleClick}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={() => this.props.deleteCompleted()}
        >
            Clear completed
        </button>
      </footer>
    );
  }
}

FooterBar.propTypes = {
  filterTodos: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
};
