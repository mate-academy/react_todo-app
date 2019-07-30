import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  state = {
    title: '',
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.title) {
      this.props.addNewTodo(this.state.title);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        onBlur={this.handleSubmit}
      >
        <input
          name="todo"
          value={title}
          onChange={this.handleInput}
          className="new-todo"
          placeholder="Add new ToDo !"
        />
      </form>
    );
  }
}

InputField.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default InputField;
