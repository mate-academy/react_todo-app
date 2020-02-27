import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export class Todo extends Component {
  state = {
    tempTitle: this.props.todo.title,
    isEdit: false,
  }

  textInput = React.createRef();

  componentDidUpdate() {
    if (this.state.isEdit) {
      this.textInput.current.focus();
    }
  }

  onEdit = () => {
    this.setState({ isEdit: true });
    this.textInput.current.focus();
  }

  onEditInput = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  }

  onBlurInput = () => {
    let newTitle;
    const { tempTitle } = this.state;
    const { onEdit, todo: { id, title } } = this.props;

    if (tempTitle.trim() !== '') {
      onEdit(id, tempTitle.trim());
      newTitle = tempTitle;
    } else {
      newTitle = title;
    }

    this.setState({
      tempTitle: newTitle,
      isEdit: false,
    });
  }

  onEscape = (event) => {
    if (event.keyCode === 27) {
      this.setState({
        tempTitle: this.props.todo.title,
        isEdit: false,
      });
    }
  }

  onKeyInput = (event) => {
    if (event.key === 'Enter') {
      let newTitle;
      const { tempTitle } = this.state;
      const { onEdit, todo: { id, title } } = this.props;

      if (tempTitle.trim() !== '') {
        onEdit(id, tempTitle.trim());
        newTitle = tempTitle;
      } else {
        newTitle = title;
      }

      this.setState({
        tempTitle: newTitle,
        isEdit: false,
      });
    }
  }

  render() {
    const {
      todo: {
        title, completed, id,
      },
      onCheckBox,
      onDestroy,
    } = this.props;

    return (
      <li
        className={cx({
          completed,
          editing: this.state.isEdit,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onClick={() => onCheckBox(id)}
          />
          <label onDoubleClick={this.onEdit}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDestroy(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.tempTitle}
          onChange={this.onEditInput}
          onBlur={this.onBlurInput}
          onKeyPress={this.onKeyInput}
          onKeyDown={this.onEscape}
          ref={this.textInput}
        />
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onCheckBox: PropTypes.func.isRequired,
};
