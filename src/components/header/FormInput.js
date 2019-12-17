import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
  state = {
    inputedValue: '',
  };

  handleInput = (event) => {
    this.setState({
      inputedValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addTodo(this.state.inputedValue);

    this.setState({
      inputedValue: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleInput}
          value={this.state.inputedValue}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

FormInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default FormInput;
