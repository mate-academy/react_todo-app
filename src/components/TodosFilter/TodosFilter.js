import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { todoShape } from '../Shapes';

export class TodosFilter extends Component {
  state = {
    activeFilter: 'All',
  }

  setActiveFilter = (event) => {
    this.setState({
      activeFilter: event.target.id,
    });
  }

  resetFilter = (event) => {
    event.preventDefault();
    this.props.getTodos(this.props.todoList, this.props.todoList);
  }

  filterTodos = (event) => {
    event.preventDefault();

    const todosCopy = this.props.todoList
      .filter(todo => todo.completed === false);

    this.props.getTodos(this.props.todoList, todosCopy);
  }

  showCompletedTodos = (event) => {
    event.preventDefault();

    const todosCopy = this.props.todoList
      .filter(todo => todo.completed === true);

    this.props.getTodos(this.props.todoList, todosCopy);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            className={this.state.activeFilter === 'All' ? 'selected' : ''}
            href="#/"
            id="All"
            onFocus={this.setActiveFilter}
            onClick={this.resetFilter}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={this.state.activeFilter === 'Active' ? 'selected' : ''}
            href="#/active"
            id="Active"
            onFocus={this.setActiveFilter}
            onClick={this.resetFilter}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={
              this.state.activeFilter === 'completed'
                ? 'selected'
                : ''
            }
            href="#/completed"
            id="Completed"
            onFocus={this.setActiveFilter}
            onClick={this.resetFilter}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
};
