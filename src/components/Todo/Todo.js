import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export class Todo extends Component {
  state = {
    title: this.props.title,
    tempTitle: this.props.title,
    isEdit: false,
    targetInput: undefined,
  }

  componentDidUpdate() {
    const { isEdit, targetInput } = this.state;

    if (isEdit && targetInput) {
      targetInput.focus();
    }
  }

   checkBoxClicked = () => {
     const { onCheckBox, id } = this.props;

     onCheckBox(id);
   }

  onDestroyClick = () => {
    const { onDestroy, id } = this.props;

    onDestroy(id);
  }

  onEdit = () => {
    this.setState({ isEdit: true });
  }

  onEditInput = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  }

  onBlurInput = () => {
    let newTitle;
    const { tempTitle, title } = this.state;
    const { onEdit, id } = this.props;

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
      this.setState(prevState => ({
        tempTitle: prevState.title,
        isEdit: false,
      }));
    }
  }

  onKeyInput = (event) => {
    if (event.key === 'Enter') {
      let newTitle;
      const { tempTitle, title } = this.state;
      const { onEdit, id } = this.props;

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

  refHandler = (ref) => {
    this.setState({ targetInput: ref });
  }

  render() {
    const { title, completed } = this.props;

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
            onClick={this.checkBoxClicked}
          />
          <label onDoubleClick={this.onEdit}>{title}</label>
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
          onKeyDown={this.onEscape}
          ref={this.refHandler}
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
