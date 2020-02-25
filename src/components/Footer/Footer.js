import React from 'react';
import PropTypes from 'prop-types';

export class Footer extends React.Component {

  changeShowFlag = (event) => {
    const { target } = event;
    const { updateShowCurrentTaslFlag } = this.props;

    updateShowCurrentTaslFlag(target.name);
  };

  clearComplited = () => {
    const { clearComplited, initialTasksList } = this.props;
    const newInitialTaskList = initialTasksList.filter(task => !task.completed);

    clearComplited(newInitialTaskList);
  };

  render() {
    const { initialTasksList } = this.props;
    const leftItems = initialTasksList.filter(task => !task.completed);

    return (
      <footer className="footer">
        <span className="todo-count">
          {
            leftItems.length > 1
              ? `items left ${leftItems.length}`
              : `item left ${leftItems.length}`
          }

        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className="selected"
              onClick={this.changeShowFlag}
              name="all"
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={this.changeShowFlag}
              name="active"
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={this.changeShowFlag}
              name="completed"
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={this.clearComplited}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  initialTasksList: [],
};

Footer.propTypes = {
  initialTasksList: PropTypes.arrayOf(PropTypes.shape()),
  updateShowCurrentTaslFlag: PropTypes.func.isRequired,
  clearComplited: PropTypes.func.isRequired,
};
