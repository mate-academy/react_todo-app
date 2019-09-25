import React from 'react';
import './Form.css';

export class Form extends React.Component {
  state = {
    title: '',
    lengthOfTodos: 1,
  };

  handleClick = (event) => {
    event.preventDefault();
    const { title } = event.target;
    const { addTodo } = this.props;

    if (title.value.length === 0) {
      return false;
    }

    const newTodo = {
      title: title.value,
      completed: false,
      id: this.state.lengthOfTodos,
    };

    this.setState(prevState => ({
      ...prevState,
      title: '',
      lengthOfTodos: prevState.lengthOfTodos + 1,
    }));

    addTodo(newTodo);
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleClick}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={this.state.title}
          name="title"
        />
        <input type="submit" className="enter-submit" />
      </form>
    );
  }
}
