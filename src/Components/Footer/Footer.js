import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Footer extends Component {
  state = {
    // currentUrl: '#/',
    // links: [{
    //   url: '#/',
    //   value: 'All',
    //   isSelected: true,
    // },
    // {
    //   url: '#/active',
    //   value: 'Active',
    //   isSelected: false,
    // },
    // {
    //   url: '#/completed',
    //   value: 'Completed',
    //   isSelected: false,
    // },
    // ],
  }

  // isActiveLink = (event) => {
  //   const href = event.target.getAttribute('href');

  //   this.setState({
  //     currentUrl: href,
  //   });
  // }

  render() {
    const {
      todoCount,
      onClearCompletedTodo,
      urlPath,
      onChangeUrlPath,
    } = this.props;
    // const { currentUrl } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${todoCount} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={urlPath === '#/' ? 'selected' : ''}
              onClick={(event) => {
                onChangeUrlPath(event);
                // this.isActiveLink(event);
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              // className="selected"
              className={urlPath === '#/active' ? 'selected' : ''}
              onClick={(event) => {
                onChangeUrlPath(event);
                // this.isActiveLink(event);
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={urlPath === '#/completed' ? 'selected' : ''}
              onClick={(event) => {
                onChangeUrlPath(event);
                // this.isActiveLink(event);
              }}
            >
              Completed
            </a>
          </li>
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
  urlPath: PropTypes.string.isRequired,
  onChangeUrlPath: PropTypes.func.isRequired,
};
