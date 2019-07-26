import React from 'react';
import PropTypes from 'prop-types';

let counter = 2;

class NewTodo extends React.Component {
  state = {
    input: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.state.input;
    const id = counter;

    if (title) {
      this.props.handleSubmit(id, title);
      counter += 1;
      this.setState({
        input: '',
      });
    }
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button type="submit" />
      </form>
    );
  }
}

NewTodo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default NewTodo;
