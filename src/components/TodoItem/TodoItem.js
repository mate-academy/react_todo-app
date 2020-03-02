import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  render() {
    const {
      todo: {
        id,
        title,
        completed,
      },
      onCheckboxChecked,
      onTodoDelete,
    } = this.props;

    return (
      <li
        className={completed ? 'completed' : ''}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={title}
            onChange={this.checkboxHandler}
            onClick={() => onCheckboxChecked(id)}
          />
          <label htmlFor={title}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => onTodoDelete(id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckboxChecked: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};
