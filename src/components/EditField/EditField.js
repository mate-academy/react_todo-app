import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EditField.css';

export class EditField extends PureComponent {
  state = {
    todoTitle: this.props.value,
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose(this.props.value);

      this.setState({
        todoTitle: this.props.value,
      });
    }
  };

  handleEditorChange = (event) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
    });
  };

  handleEditSubmit = (event) => {
    event.preventDefault();

    const { todoTitle } = this.state;

    this.props.onClose(todoTitle);
  };

  render() {
    const { todoTitle } = this.state;

    return (
      <form action="#" onSubmit={this.handleEditSubmit} className="edit-form">
        <input
          type="text"
          value={todoTitle}
          onBlur={this.handleEditSubmit}
          onChange={this.handleEditorChange}
          onKeyDown={this.handleKeyDown}
          className="edit"
        />
      </form>
    );
  }
}

EditField.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
