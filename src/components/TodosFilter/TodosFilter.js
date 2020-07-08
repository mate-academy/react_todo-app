import React from 'react';
import { TodosFilterTypes } from '../Shapes/Shapes';
// import { TodoItem } from '../TodoItem/TodoItem';

export class TodosFilter extends React.Component {
  state = {};

  render() {
    const { onActive, onCompleted, onClear } = this.props;

    return (
      <>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className="selected"
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={onActive}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={onCompleted}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={onClear}
        >
          Clear completed
        </button>
      </>
    );
  }
}

TodosFilter.propTypes = TodosFilterTypes;
