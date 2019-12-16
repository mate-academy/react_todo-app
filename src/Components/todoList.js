import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  state = {
    completed: {},
  };

  handleCheck(index) {
    this.setState(state => ({
      completed: {
        ...state.completed,
        [index]: !state.completed[index],
      },
    }));
  }

  handleRemove(index) {
    const { list } = this.props;

    list.splice(index, 1);

    this.setState({});
  }

  render() {
    const { list } = this.props;

    return (
      <ul
        className="todo-list"
      >
        {list.map((item, i) => (
          <li className={!this.state.completed[i]
            ? ''
            : 'completed'}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={i}
                checked={this.i}
                onChange={() => {
                  this.handleCheck(i);
                }}
              />
              <label
                htmlFor="todo-1"
              >
                {item.note}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => {
                  this.handleRemove(i);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

TodoList.defaultProps = {
  list: [],
};

export default TodoList;
