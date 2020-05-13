import React from 'react';
import PropTypes from 'prop-types';
import FILTERS from '../../common/constants'

export default class Filter extends React.Component {
  state = {
     counter: this.counter,
  }

  buttons = [
    { name: FILTERS.all , label: "All" },
    { name: FILTERS.done, label: "Done" },
    { name: FILTERS.active, label: "Active" },
  ]

  render() {
    const { filter, onFilterChange, removeCompleted,isTodosExist } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
     const classNames = isActive ? "selected" : '';
      return (
        <li key={name}  onClick={() => onFilterChange(name)}>
          <a className={classNames}>
            {label}
          </a>
        </li>
      )
    })
    return (
      <footer className="footer"
      hidden={!isTodosExist}>
        <span className="todo-count">
          {` to do: `}
          {this.props.counter}
          {`, done: `}
          {this.props.count}
        </span>
        <ul className="filters">
          {buttons}
        </ul>
        <button type="button" className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
              </button>
      </footer>
    )
  }
}

Filter.propTypes = {
 removeCompleted: PropTypes.func.isRequired,
};
