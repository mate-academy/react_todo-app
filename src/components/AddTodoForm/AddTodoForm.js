import React from 'react';
import PropTypes from 'prop-types';

class AddTodoForm extends React.Component {
  state = {
    id: 1,
    content: '',
    completed: false,
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.content.trim().length !== 0) {
      this.props.addTodoHandle(this.state);

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
  addTodoHandle: PropTypes.func.isRequired,
};

export default AddTodoForm;
