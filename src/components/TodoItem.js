/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends React.Component {
  state = {
    editing: false,
    title: this.props.title,
    tempTitle: this.props.title,
    id: this.props.id,
  };

  onEditBlurHandler = () => {
    this.setState(prev => ({
      editing: false, title: prev.tempTitle,
    }), () => {
      this.props.onEdit(this.state.id, this.state.title);
    });
  }

  onEditKeyDownHandler = (event) => {
    if (event.keyCode === 27) {
      this.setState(prev => ({
        editing: false, tempTitle: prev.title,
      }));
    } else if (event.keyCode === 13) {
      this.onEditBlurHandler();
    }
  }

  render() {
    const {
      id,
      completed,
      onCheckboxChange,
      onRemove,
    } = this.props;
    const { editing, title, tempTitle } = this.state;

    return (
      <li
        className={
          `${editing ? 'editing' : ''}
          ${completed && !editing ? 'completed' : ''}`
        }
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            idnumber={id}
            onChange={onCheckboxChange}
            checked={completed}
          />
          <label
            htmlFor={`todo-${id}`}
            idnumber={id}
            onClick={e => e.preventDefault()}
            onDoubleClick={() => {
              this.setState({ editing: true });
            }}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            idnumber={id}
            onClick={onRemove}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={tempTitle}
          onChange={e => this.setState({ tempTitle: e.target.value })}
          onKeyDown={this.onEditKeyDownHandler}
          onBlur={this.onEditBlurHandler}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
