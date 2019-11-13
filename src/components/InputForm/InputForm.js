import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
    };
  }

  inputChanged = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    if (!this.state.task.trim()) {
      return;
    }

    const newTodo = {
      task: this.state.task,
    };

    this.props.onSubmitted(newTodo);

    this.setState({
      task: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.task}
          onChange={this.inputChanged}
        />
      </form>
    );
  }
}

InputForm.propTypes = {
  onSubmitted: PropTypes.func.isRequired,
};

export default InputForm;
