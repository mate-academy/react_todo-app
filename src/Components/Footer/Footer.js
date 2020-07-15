import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterLink } from '../FilterLink/FilterLink';
import { linksData } from './LinksData';

export class Footer extends Component {
  state = {
    currentValue: 'All',
  }

  isActiveLink = (value) => {
    this.props.onChangeFilterValue(value);
    this.setState({
      currentValue: value,
    });
  }

  render() {
    const {
      todoCount,
      onClearCompletedTodo,
    } = this.props;

    const {
      currentValue,
    } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${todoCount} items left`}
        </span>

        <ul className="filters">
          {linksData.map(link => (
            <FilterLink
              key={link.value}
              link={link}
              currentValue={currentValue}
              isActiveLink={this.isActiveLink}
            />
          ))}
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompletedTodo}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  onClearCompletedTodo: PropTypes.func.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired,
};
