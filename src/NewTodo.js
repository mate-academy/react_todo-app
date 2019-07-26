import React from 'react';
import propTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
  };

  onChangeInput = (event) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  onCLickEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.props.addTodo(this.state.title);
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

NewTodo.propTypes = {
  addTodo: propTypes.func.isRequired,
};

export default NewTodo;
