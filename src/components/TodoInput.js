import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  state = {
    title: '',
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addTodo = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      if (this.state.title !== '') {
        this.props.addTodoItem(this.state.title);
        this.setState({
          title: '',
        });
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleTitleChange}
          onKeyPress={this.addTodo}
          value={this.state.title}
        />
      </header>
    );
  }
}

TodoInput.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
};

export default TodoInput;
