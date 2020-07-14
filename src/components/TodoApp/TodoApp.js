import React from 'react';
import PropTypes from 'prop-types';

export class TodoApp extends React.Component {
  state = {
    temp: '',
    tempId: 1,
  }

  addTempTodo = (event) => {
    this.setState({
      temp: event.target.value,
    });
  }

  submitTodo = (event) => {
    const text = this.state.temp;
    const id = this.state.tempId + 1;
    const input = event.target;

    if (event.keyCode === 13) {
      this.props.addTodo(text, id);

      this.setState(prevState => ({
        tempId: prevState.tempId + 1,
        temp: '',
      }));

      input.value = '';
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onChange={this.addTempTodo}
          onKeyDown={this.submitTodo}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
