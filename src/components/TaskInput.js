import React from 'react';
import PropTypes from 'prop-types';

class TaskInput extends React.Component {
  componentDidMount() {
    this.editInput.focus();
  }

  eventHandler = (event) => {
    if (event.key && event.key !== 'Enter') {
      return null;
    }

    const { changeDescription, id, toggleInputMode } = this.props;
    const { value } = event.target;

    changeDescription(value, id);
    toggleInputMode();
    return 0;
  };

  render() {
    const { description } = this.props;
    return (
      <input
        ref={(input) => { this.editInput = input; }}
        name="edit"
        className="edit"
        defaultValue={description}
        onKeyPress={this.eventHandler}
        onBlur={this.eventHandler}
      />
    );
  }
}

TaskInput.propTypes = {
  description: PropTypes.string.isRequired,
  changeDescription: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  toggleInputMode: PropTypes.func.isRequired,
};

export default TaskInput;
