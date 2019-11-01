import React, { Component } from 'react';


class TodoFilter extends Component {
  constructor(props){
    super(props);

    this.linkHandler = this.linkHandler.bind(this);
  }
  linkHandler(evt) {
    this.props.statusFilter(evt.target.dataset.filter);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a href="#/" className={this.props.currentFilter === 'initial' ? 'selected' : ''} data-filter="initial" onClick={this.linkHandler}>All</a>
        </li>

        <li>
          <a href="#/active" className={this.props.currentFilter === 'active' ? 'selected' : ''} data-filter="active" onClick={this.linkHandler}>Active</a>
        </li>

        <li>
          <a href="#/completed" className={this.props.currentFilter === 'completed' ? 'selected' : ''} data-filter="completed" onClick={this.linkHandler}>Completed</a>
        </li>
      </ul>
    );
  }
}

export default TodoFilter;
