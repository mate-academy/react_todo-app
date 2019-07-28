import React from 'react';
import PropTypes from 'prop-types';

let counter = 1;

class NewTodo extends React.Component {
  state = {
    todo: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.state.todo;
    const id = counter;

    if (title) {
      this.props.handleSubmit(id, title);
      counter += 1;
      this.setState({
        todo: '',
      });
    }
  }

  handleChange = (event) => {
    this.setState({ todo: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.todo}
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
