import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.inputChange = this.inputChange.bind(this);
    this.submitted = this.submitted.bind(this);
  }

  inputChange(evt) {
    this.setState({
      input: evt.target.value,
    });
  }

  submitted(evt) {
    if (evt.key === 'Enter') {
      this.props.onSubmit(this.state.input);
      this.setState({
        input: '',
      });
    }
  }

  render() {
    return (
      <div>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.input}
          onChange={this.inputChange}
          onKeyPress={this.submitted}
        />
      </div>
    );
  }
}

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddTodo;
