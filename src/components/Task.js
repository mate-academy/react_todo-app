import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.PureComponent {
  componentDidUpdate() {
    if (this.editInput) {
      this.editInput.focus();
    }
  }

  render() {
    const {
      completed,
      description,
      toggleStatus,
      inputMode,
      toggleInputMode,
      changeDescription,
      id,
      remove,
    } = this.props;

    if (inputMode) {
      return (
        <input
          ref={(input) => { this.editInput = input; }}
          name="edit"
          className="edit"
          defaultValue={description}
          onKeyPress={changeDescription}
          onBlur={changeDescription}
        />
      );
    }

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            checked={completed}
            onChange={toggleStatus}
          />
          <label
            htmlFor={`todo-${id}`}
            onDoubleClick={toggleInputMode}
            onClick={event => event.preventDefault()}
          >
            {description}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={remove}
          />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  toggleStatus: PropTypes.func.isRequired,
  inputMode: PropTypes.bool.isRequired,
  toggleInputMode: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Task;
