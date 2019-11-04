import React, { Component } from 'react';

export default class InputField extends Component {

  state = {
    text: ''
  }

  onInputChange = (event) => {
    this.setState({
      text: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.text.match(/\w/g)) return;
    this.props.onSubmit(this.state.text);
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <form action="index.html" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={this.state.text}
        />
      </form>
    );
  }
}
