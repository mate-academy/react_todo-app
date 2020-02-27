import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EditField.css';

export class EditField extends PureComponent {
  state = {
    editingValue: this.props.value,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.handleEditSubmit(event);
    }
  };

  handleEditorChange = (event) => {
    const { value } = event.target;

    this.setState({
      editingValue: value,
    });
  };

  handleEditSubmit = (e) => {
    if (e.type === 'blur' || e.type === 'submit') {
      e.preventDefault();
    }

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
