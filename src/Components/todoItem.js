import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
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
      list.map((item, i) => (
        <li
          key={item.id}
          className={!this.state.completed[i]
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
      )));
  }
}

TodoItem.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

TodoItem.defaultProps = {
  list: [],
};

export default TodoItem;
