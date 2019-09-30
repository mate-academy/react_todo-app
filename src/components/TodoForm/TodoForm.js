import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default class TodoForm extends React.Component {
  state = {
    text: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
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
        <h1>todos</h1>
        <input
          name="text"
          className="new-todo"
          placeholder="What needs to be done?"
          // name={this.state.text}
          onChange={this.handleChange}
          value={this.state.text}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
