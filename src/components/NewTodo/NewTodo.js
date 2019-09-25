import React from 'react';
import './NewTodo.css';

export class NewTodo extends React.Component {
state = {
  title: '',
  arrLength: 1,
};

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addTodo } = this.props;
    const { newTodo } = e.target;

    if (newTodo.value !== '') {
      const obj = {
        title: newTodo.value,
        id: this.state.arrLength,
        completed: false,
      };

      this.setState(prevState => ({
        ...prevState,
        title: '',
        arrLength: prevState.arrLength + 1,
      }));
      addTodo(obj);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="newTodo"
          id="newTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <input type="submit" className="enter-submit" />
      </form>
    );
  }
}
