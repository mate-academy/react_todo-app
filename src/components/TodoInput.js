import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoInput extends Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    if (!event.target.value.trim()) {
      this.setState({ label: '' });

      return;
    }

    this.setState({ label: event.target.value });
  };

  handleInputKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.label !== '') {
      this.props.onItemAdded(this.state.label);
      this.setState({ label: '' });
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.label}
        onChange={this.onLabelChange}
        onKeyDown={this.handleInputKeyDown}
      />
    );
  }
}

TodoInput.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default TodoInput;
