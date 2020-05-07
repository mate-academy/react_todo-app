import React from 'react';
import PropTypes from 'prop-types';
import * as cn from 'classnames';

export class Todo extends React.Component {
  state = {
    currentValue: '',
    isEditing: false,
  }

  textInput = React.createRef();

  startEdit = () => {
    this.setState({
      isEditing: true,
      currentValue: this.props.text,
    }, () => {
      this.textInput.current.focus();
    });
  }

  handleChange = (event) => {
    this.setState({
      currentValue: event.target.value,
    });
  }

  handleKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      this.props.onTextChanged(id, this.state.currentValue);

      this.setState({
        currentValue: '',
        isEditing: false,
      });
    } else if (event.key === 'Escape') {
      this.setState({
        currentValue: '',
        isEditing: false,
      });
    }
  }

  blurHandler = (id) => {
    this.props.onTextChanged(id, this.state.currentValue);

    this.setState({
      currentValue: '',
      isEditing: false,
    });
  }

  render() {
    const { isEditing, currentValue } = this.state;
    const { id, done, text, toggleItem, onDelete } = this.props;

    return (
      <li
        onDoubleClick={this.startEdit}
        className={cn({
          completed: done,
          editing: isEditing,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            checked={done}
            onChange={() => toggleItem(id)}
          />
          <label htmlFor={`todo-${id}`}>{text}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDelete(id)}
          />
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            value={currentValue}
            onChange={this.handleChange}
            onKeyUp={event => this.handleKeyPress(event, id)}
            onBlur={() => this.blurHandler(id)}
            ref={this.textInput}
          />
        )}
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  toggleItem: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTextChanged: PropTypes.func.isRequired,
};
