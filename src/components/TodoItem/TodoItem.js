import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state = {
    isChecked: this.props.completed,
  }

  handleChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }));
  }

  render() {
    const { title, completed, id, toggleComplete, deleteItem } = this.props;

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={this.state.isChecked}
            onChange={this.handleChange}
            onClick={() => toggleComplete(id - 1)}
          />
          <label htmlFor={id}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteItem(id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
