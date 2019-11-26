import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.text);
        this.setState({ text: '' });
      }}
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

NewTodo.defaultProps = {
  handleSubmit: {},
};

NewTodo.propTypes = {
  handleSubmit: PropTypes.func,
};

export default NewTodo;
