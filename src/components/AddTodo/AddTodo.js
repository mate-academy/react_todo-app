import React from 'react';

class AddTodo extends React.Component {
  state = {
    newTitle: '',
    id: 0,
  }

  handleInputTodo = (event) => {
    this.setState({
      newTitle: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const {
      newTitle,
      id,
    } = this.state;
    const { addTodo } = this.props;

    event.preventDefault();

    if (newTitle.length > 0 && newTitle[0] !== ' ') {
      const todo = {
        title: newTitle,
        id,
        status: false,
      };

      this.setState(prevState => ({
        newTitle: '',
        id: prevState.id + 1,
      }));
      addTodo(todo);
    }

    if (newTitle.length === 0 || newTitle[0] === ' ') {
      this.setState({
        newTitle: '',
      });
    }
  }

  render() {
    const { newTitle } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleInputTodo}
          value={newTitle}
        />
      </form>
    );
  }
}

export default AddTodo;
