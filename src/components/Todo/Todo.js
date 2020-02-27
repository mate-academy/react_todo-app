import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';

import './Todo.css';

class Todo extends Component {
  state = {
    editing: false,
  };

  componentDidUpdate() {
    if (this.state.editing) {
      this.title.focus();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.title.value;

    this.props.onEdit(this.props.id, title);
    this.setState({ editing: false });
  }

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  }

  handleToggle = () => {
    this.props.onToggle(this.props.id);
  }

  handleEdit = () => {
    this.setState({ editing: true });
  }

  renderDisplay = () => {
    const className = `todo${this.props.completed ? ' completed' : ''}`;

    return (
      <div className={className}>
        <Checkbox checked={this.props.completed} onClick={this.handleToggle} />

        <span className="todo__title">{this.props.title}</span>

        <Button className="edit icon" icon="edit" onClick={this.handleEdit} />
        <Button
          className="delete icon"
          icon="delete"
          onClick={this.handleDelete}
        />
      </div>
    );
  }

  renderForm = () => (
    <form className="todo-edit-form" onSubmit={this.handleSubmit}>
      <input
        type="text"
        ref={(ref) => {
          this.title = ref;
        }}
        defaultValue={this.props.title}
      />
      <Button className="save icon" icon="save" type="submit" />
    </form>
  )

  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Todo;
