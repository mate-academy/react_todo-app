import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
    };
  }

  inputChanged = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  submitEditItem = (event) => {
    event.preventDefault();
    if (!this.state.task.trim()) {
      return;
    }

    const newTask = {
      task: this.state.task,
    };

    this.props.onEditSubmitted(newTask);

    this.setState({
      task: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.submitEditItem}>
        <input
          className="new-todo"
          placeholder="What do you want to change?"
          value={this.state.task}
          onChange={this.inputChanged}
        />
        <button
          onClick={this.destroyTodo}
          type="button"
          className="destroy"
        />
      </form>
    );
  }
}

Editor.propTypes = {
  onEditSubmitted: PropTypes.func.isRequired,
};

export default Editor;
