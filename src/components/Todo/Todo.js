import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Todo extends Component {
  state = {
    title: this.props.title,
    tempTitle: this.props.title,
  }

   checkBoxClicked = (event) => {
     event.target.closest('li').classList.toggle('completed');
     this.props.onCheckBox(this.props.id);
   }

  onDestroyClick = () => {
    this.props.onDestroy(this.props.id);
  }

  onEdit = (event) => {
    if (event.target.tagName === 'LABEL') {
      event.currentTarget.classList.add('editing');
      event.currentTarget.querySelector('.edit').focus();
    }
  }

  onEditInput = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  }

  onBlurInput = (event) => {
    if (this.state.tempTitle.trim() !== '') {
      this.props.onEdit(this.props.id, this.state.tempTitle.trim());
      event.target.closest('li').classList.remove('editing');
    } else {
      this.setState(prevState => ({
        tempTitle: prevState.title,
      }));
      event.target.closest('li').classList.remove('editing');
    }
  }

  onEscape = (event) => {
    if (event.keyCode === 27) {
      this.setState(prevState => ({
        tempTitle: prevState.title,
      }));
      event.target.closest('li').classList.remove('editing');
    }
  }

  onKeyInput = (event) => {
    if (event.key === 'Enter') {
      if (this.state.tempTitle.trim() !== '') {
        this.props.onEdit(this.props.id, this.state.tempTitle.trim());
        event.target.closest('li').classList.remove('editing');
      } else {
        this.setState(prevState => ({
          tempTitle: prevState.title,
        }));
        event.target.closest('li').classList.remove('editing');
      }
    }
  }

  render() {
    const { title, completed } = this.props;

    return (
      <li
        onDoubleClick={this.onEdit}
        className={completed ? 'completed' : ''}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onClick={this.checkBoxClicked}
          />
          <label>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={this.onDestroyClick}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.tempTitle}
          onChange={this.onEditInput}
          onBlur={this.onBlurInput}
          onKeyPress={this.onKeyInput}
          onFocus={this.onFocusInput}
          onKeyDown={this.onEscape}
        />
      </li>
    );
  }
}

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onCheckBox: PropTypes.func.isRequired,
};
