import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    inputValue: '',
    idToDo: 0,
  }

  onInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputValue.trim() !== '') {
      this.props.addToDo({
        title: this.state.inputValue,
        idToDo: this.state.idToDo,
        completed: false,
      });
      this.setState(state => ({
        inputValue: '',
        idToDo: state.idToDo + 1,
      }));
    }
  }

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}

Form.propTypes = { addToDo: PropTypes.func.isRequired };

export default Form;
