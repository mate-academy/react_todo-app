import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Form.css';

class Form extends Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (title.trim().length > 0) {
      this.props.onAdd(title);
      this.setState({ title: '' });
    }
  }

  handleChange = (event) => {
    const title = event.target.value;

    this.setState({ title });
  }

  render() {
    const disabled = !this.state.title;

    return (
      <form className="todo-add-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.title}
          placeholder="What needs to be done?"
          onChange={this.handleChange}
        />

        <Button type="submit" disabled={disabled}>Add</Button>
      </form>
    );
  }
}

Form.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Form;
