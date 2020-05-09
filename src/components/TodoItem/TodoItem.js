import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class TodoItem extends React.Component {
  state = {
    title: this.props.title,
    id: this.props.id,
    completed: this.props.completed,
  };

  handleCheckboxChange = () => {
    this.setState(state => ({
      completed: !state.completed,
    }));
  }

  render() {
    const { title, id, completed } = this.state;

    return (
      <li>
        <div className="view">
          <input
            type="checkbox"
            onChange={this.handleCheckboxChange}
            className="toggle"
            id={`todo-${id}`}
          />
          <label
            className={ClassNames({ completed })}
            htmlFor={`todo-${id}`}
          >
            {title}
          </label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
