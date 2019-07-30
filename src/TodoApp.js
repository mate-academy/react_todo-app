import React from 'react';

class TodoApp extends React.Component {
  state = {
    title: '',
    id: (new Date()).valueOf(),
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleKeyUp = (event) => {
    const { addNewTodo } = this.props;
    const { id, title } = this.state;

    if (title !== '' && event.keyCode === 13) {
      addNewTodo({
        id,
        title,
        completed: false,
      });
      this.setState({
        title: '',
        id: id + 1,
      });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.title}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}

export default TodoApp;
