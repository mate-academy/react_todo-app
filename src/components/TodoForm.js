import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default class TodoForm extends Component {
  state = {
    text: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;

    event.preventDefault();

    onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      complete: false,
    });

    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
