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
    const { inputValue } = this.state;

    if (inputValue !== '') {
      this.props.addTask({
        id: uuidv4(),
        title: inputValue,
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
    const { inputValue } = this.state;
    const placeholder = this.state.inputError
      ? 'Enter valid Task' : 'What needs to be done?';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={this.handleInputChange}
          value={inputValue}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTask: PropTypes.func.isRequired,
};
