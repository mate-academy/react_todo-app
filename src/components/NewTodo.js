import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  onLabelChange = (event) => {
    const value = event.target.value.replace('  ', ' ');
    this.setState({
      title: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;
    this.setState({ title: '' });
    this.props.onItemAdded(title);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.title}
          onChange={this.onLabelChange}
        />
        <button
          disabled={this.state.title.length < 3}
          type="submit"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
