import React from 'react';
import PropTypes from 'prop-types';

class Edit extends React.PureComponent {
  state = {
    editTitle: this.props.title,
  }

  changeTitle = (evt) => {
    this.setState({
      editTitle: evt.target.value,
    });
  }

  closeEdit = (evt) => {
    if (evt.key === 'Enter') {
      this.props.editTodo(this.state.editTitle, this.props.id);
      this.props.offEdit();
    }

    if (evt.key === 'Escape') {
      this.props.offEdit();

      this.setState({
        editTitle: this.props.title,
      });
    }
  }

  render() {
    return (
      <input
        type="text"
        className="edit"
        value={this.state.editTitle}
        onChange={this.changeTitle}
        onKeyDown={this.closeEdit}
      />
    );
  }
}

export default Edit;

Edit.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  offEdit: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
