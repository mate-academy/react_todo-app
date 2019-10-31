import React from 'react';
import PropTypes from 'prop-types';

class AddNewTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    }
  }

  inputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitTodoForm = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue)
    this.setState(prev => {
      return {
        ...prev,
        inputValue: ''
      }
    })
  }

  render () {
    const { placeholder } = this.props;

    return (
      <form onSubmit={this.submitTodoForm}>
        <input type="text"
          placeholder={placeholder}
          className="new-todo"
          value={this.state.inputValue}
          onChange={this.inputChange}
        />
      </form>
    )
  }
}

AddNewTodo.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AddNewTodo;
