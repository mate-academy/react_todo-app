import React from 'react';
import uuid from 'uuid/v4';

export class NewTodo extends React.Component {
  state = {
    title: '',
    id: '',
    complited: false,
  }

  handleChange = (event) => {
    const title = event.target.value;

    this.setState({
      title,
    });
  }

  handleKeyPress = (event) => {
    const { title } = this.state;

    if (event.key === 'Enter') {
      const todo = {
        id: uuid(),
        title,
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
        id: '',
        complited: false,
      })
    }
  }

  render() {
    const { title } = this.state;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name={title}
        value={title}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}

      />
    );
  }
}
