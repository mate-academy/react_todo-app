import React from 'react';
import { NewTodoPropTypes } from '../../constants/proptypes';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;

    if (inputValue) {
      this.props.onAdd(inputValue);

      this.setState({
        inputValue: '',
      });
    }
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value.replace(/^\s+/, ''),
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoPropTypes;

export default NewTodo;
