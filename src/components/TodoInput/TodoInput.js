import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  state = {
    title: '',
  };

  getKey = () => (Math.random() * 100);

  handleSubmitTodo = (event) => {
    event.preventDefault();

    if (this.state.title !== '') {
      const todo = {
        title: this.state.title,
        id: `${this.getKey()}`,
        complete: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
      });
    }
  }

  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value.trim(),
    });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmitTodo}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
