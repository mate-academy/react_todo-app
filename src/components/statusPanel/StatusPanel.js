import React, { Component } from 'react';

export default class StatusPanel extends Component {

  buttons = [
    {name: 'All'},
    {name: 'Active'},
    {name: 'Completed'},
  ]

  render() {
    const { todolist,
            getClearList,
            filterStatus,
            onFilterChange } = this.props;

    const itemsLeft = todolist.filter(item => !item.done).length;
    const displayClear = todolist.filter(item => item.done).length >= 1 ? `block` : `none`;

    const buttons = this.buttons.map(({name}) => {
      const isActive = filterStatus === name;
      const selectedButton = isActive ? `selected` : ``;
      return (
        <li>
          <a href={`#/${name}`}
          className={selectedButton}
          onClick={() => onFilterChange(name)}>{name}</a>
        </li>

      );
    })

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">{itemsLeft} items left</span>
        <ul className="filters">
          {buttons}
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: `${displayClear}` }}
          onClick={getClearList}
        >Clear Completed</button>
      </footer>
    );
  }
}
