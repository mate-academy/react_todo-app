import React from 'react';
import PropTypes from 'prop-types';
import { todoShape } from './Shapes';

export class TodosFilter extends React.Component {
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

  showComletedTodos = (event) => {
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
            id="All"
            onFocus={this.setActiveFilter}
            onClick={this.resetFilter}
            href="#/"
            className={this.state.activeFilter === 'All' ? 'selected' : ''}
          >
            All
          </a>
        </li>
        <li>
          <a
            id="Active"
            onClick={this.filterTodos}
            onFocus={this.setActiveFilter}
            href="#/active"
            className={this.state.activeFilter === 'Active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            id="Completed"
            onFocus={this.setActiveFilter}
            onClick={this.showComletedTodos}
            className={this.state.activeFilter === 'Completed'
              ? 'selected' : ''}
            href="#/completed"
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
