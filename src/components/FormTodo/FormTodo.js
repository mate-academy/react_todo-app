import React from 'react';

class FormTodo extends React.Component {
  state = {
    title: '',
    id: 1,
  };

  handleClick = (event) => {
    event.preventDefault();
    if (event.target.text.value.length === 0) {
      return false;
    }

    const { addTodo } = this.props;
    const newTodo = {
      title: this.state.title,
      completed: false,
      id: this.state.id,
    };

    this.setState(prevState => ({ title: '', id: prevState.id + 1 }));

    addTodo(newTodo);
  };

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleClick}>
        <input
          className="new-todo"
          name="text"
          placeholder="What needs to be done?"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
}

export default FormTodo;
