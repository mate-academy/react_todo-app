import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  deleteItem(evt) {
    this.props.onDelete(this.props.todo.id);
  }

  isChecked(evt) {
    this.props.isCompleted(this.props.todo);
  }

  render() {
    const { id, title, completed } = this.props.todo;

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            onChange={this.isChecked}
            className="toggle"
            id={id}
            checked={completed}
          />
          <label htmlFor={id} onDoubleClick={this.deleteItem}>{title}</label>
          <button type="button" className="destroy" onClick={this.deleteItem} />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default TodoItem;
