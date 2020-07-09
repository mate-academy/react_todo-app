import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterLink } from '../FilterLink/FilterLink';
import { linksData } from './LinksData';

export class Footer extends Component {
  state = {
    currentUrl: '#/',
    links: linksData,
  }

  isActiveLink = (event) => {
    const href = event.target.getAttribute('href');

    this.props.onChangeUrlPath(href);
    this.setState({
      currentUrl: href,
    });
  }

  render() {
    const {
      todoCount,
      onClearCompletedTodo,
    } = this.props;
    const {
      links,
      currentUrl,
    } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${todoCount} items left`}
        </span>

        <ul className="filters">
          {links.map(link => (
            <FilterLink
              key={link.url}
              link={link}
              currentUrl={currentUrl}
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
  onChangeUrlPath: PropTypes.func.isRequired,
};
