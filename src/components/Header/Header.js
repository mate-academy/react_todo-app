import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Header extends Component {
  state = {
    input: '',
    id: 0,
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value.replace(/[^\w\s]|^\s+$/g, ''),
    });
  }

  handleEnterPress = (event) => {
    const { addTodo } = this.props;
    const { input, id } = this.state;

    if (event.key === 'Enter') {
      const todo = ({
        title: input,
        id,
        completed: false,
      });

      addTodo(todo);

      this.setState(prevState => ({
        input: '',
        id: prevState.id + 1,
      }));
    }
  }

  render() {
    return (
      <header>
        <h1>TODOS</h1>
        <input
          className="new-todo"
          value={this.state.input}
          onKeyDown={this.handleEnterPress}
          onChange={this.handleChange}
          placeholder="Write your todo"
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
