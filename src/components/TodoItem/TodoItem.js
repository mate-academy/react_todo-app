import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    ...this.props,
  }

  toggleChecked = () => {
    this.setState(prev => ({
      ...prev,
      completed: !prev.completed,
    }));
  }

  render() {
    const { title, id, completed } = this.state;

    return (
      <li
        className={
          completed
            ? 'completed'
            : 'view'
        }
      >
        <div>
          <input
            type="checkbox"
            className="toggle"
            id={id}
            onChange={this.toggleChecked}
          />
          <label htmlFor={id}>{title}</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

export default TodoItem;

TodoItem.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
}).isRequired;
