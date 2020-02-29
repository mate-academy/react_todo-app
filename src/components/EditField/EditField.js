import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EditField.css';

export class EditField extends PureComponent {
  state = {
    editingValue: this.props.value,
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose(this.props.value);

      this.setState({
        editingValue: this.props.value,
      });
    }
  };

  handleEditorChange = (event) => {
    const { value } = event.target;

    this.setState({
      editingValue: value,
    });
  };

  handleEditSubmit = (event) => {
    event.preventDefault();

    const { editingValue } = this.state;

    this.props.onClose(editingValue);
  };

  render() {
    const { editingValue } = this.state;

    return (
      <form action="#" onSubmit={this.handleEditSubmit} className="edit-form">
        <input
          type="text"
          value={editingValue}
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
