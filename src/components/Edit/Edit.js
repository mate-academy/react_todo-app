import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

class Edit extends PureComponent {
  constructor(props) {
    super(props);

    this.input = createRef();

    this.state = {
      editTitle: this.props.title,
    };
  }

  componentDidMount() {
    this.input.current.focus();
  }

  changeTitle = (event) => {
    this.setState({
      editTitle: event.target.value,
    });
  }

  closeEdit = (event) => {
    if (event.key === 'Enter') {
      this.props.editTodo(this.state.editTitle.trim(), this.props.id);
      this.props.offEdit();
    }

    if (event.key === 'Escape') {
      this.props.offEdit();

      this.setState({
        editTitle: this.props.title,
      });
    }
  }

  saveEdit = () => {
    this.props.editTodo(this.state.editTitle.trim(), this.props.id);
    this.props.offEdit();
  }

  render() {
    return (
      <input
        type="text"
        className="edit"
        value={this.state.editTitle}
        ref={this.input}
        onChange={this.changeTitle}
        onKeyDown={this.closeEdit}
        onBlur={this.saveEdit}
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
