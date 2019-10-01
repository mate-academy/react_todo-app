import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuidv4';

class AddTodo extends React.Component {
  state = {
    title: '',
  }

  handleInputTodo = ({ target }) => {
    this.setState({
      title: target.value.trimStart(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (title) {
      const todo = {
        title,
        id: uuid(),
        status: false,
      };

      this.setState({
        title: '',
      });
      this.props.addTodo(todo);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleInputTodo}
          value={this.state.title}
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func,
}.isRequired;

export default AddTodo;
