import React from 'react';
import PropTypes from 'prop-types';
import TaskInput from './TaskInput';

class Task extends React.PureComponent {
  state = {
    inputMode: false,
  };

  toggleInputMode = () => {
    this.setState(prevState => ({
      inputMode: !prevState.inputMode,
    }));
  };

  render() {
    const {
      completed,
      description,
      toggleStatus,
      changeDescription,
      id,
      remove,
    } = this.props;

    if (this.state.inputMode) {
      return (
        <TaskInput
          toggleInputMode={this.toggleInputMode}
          description={description}
          changeDescription={changeDescription}
          taskKey={id}
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
            onDoubleClick={this.toggleInputMode}
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
  toggleInputMode: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Task;
