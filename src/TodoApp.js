import React from 'react';
import propTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    title: '',
  };

  onChangeInput = (event) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  onCLickEnter = (event) => {
    const { title } = this.state;
    if (event.keyCode === 13) {
      event.preventDefault();

      if (!title || title === ' ') {
        return;
      }

      this.props.addTodo(title);
      this.setState({ title: '' });
    }
  };

  render() {
    const { title } = this.state;

    return (
      <input
        type="text"
        name="title"
        onChange={this.onChangeInput}
        className="new-todo"
        value={title}
        placeholder="What needs to be done?"
        onKeyUp={this.onCLickEnter}
      />
    );
  }
}

TodoApp.propTypes = {
  addTodo: propTypes.func.isRequired,
};

export default TodoApp;
