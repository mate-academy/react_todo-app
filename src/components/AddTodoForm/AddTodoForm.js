import React from 'react';
import PropTypes from 'prop-types';

class AddTodoForm extends React.Component {
  state = {
    content: '',
    id: 1,
    completed: false,
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value.trim(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.content) {
      this.props.addTodo(this.state);

      this.setState(prevState => ({
        content: '',
        id: prevState.id + 1,
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.content}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
