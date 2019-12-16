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
    const { item, i } = this.props;

    return (

      <li
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
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.date,
  ])),
  i: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
};

TodoItem.defaultProps = {
  item: '',
  i: null,
  list: [],
};

export default TodoItem;
