import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    inputValue: '',
    inputError: false,
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value.trimStart(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.inputValue !== '') {
      this.props.addTask({
        id: uuidv4(),
        title: this.state.inputValue,
        completed: false,
      });
      this.setState({
        inputValue: '',
        inputError: false,
      });
    } else {
      this.setState({
        inputError: true,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder={this.state.inputError
            ? 'Enter valid Task' : 'What needs to be done?'}
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTask: PropTypes.func.isRequired,
};
