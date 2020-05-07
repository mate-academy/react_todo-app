import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoItem extends React.PureComponent {
  render() {
    return (
      <li
        key={this.props.todo.id}
        className={classNames({ completed: this.props.todo.completed })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={this.props.todo.id}
            onChange={() => this.props.completed(this.props.todo.id)}
            checked={this.props.todo.completed}
          />
          <label
            htmlFor={this.props.todo.id}
          >
            {this.props.todo.title}
          </label>
          <button
            type="button"
            id={this.props.todo.id}
            className="destroy"
            onClick={() => this.props.deleteItem(this.props.todo.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

export default TodoItem;

TodoItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    edited: PropTypes.bool,
  }).isRequired,
};
