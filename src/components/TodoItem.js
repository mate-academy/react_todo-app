import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KEYCODE } from '../utils/const';

export class TodoItem extends React.PureComponent {
  state = {
    inEditMode: false,
    updateValue: '',
  };

  updateInputRef = React.createRef();

  handleUpdateInputBlur = () => {
    const { updateValue } = this.state;
    const { id, onUpdate } = this.props;

    this.setState({
      inEditMode: false,
      updateValue: '',
    });

    if (updateValue !== '') {
      onUpdate(id, updateValue);
    }
  }

  handleEditButtonClick = () => {
    const { title } = this.props;

    this.setState({
      inEditMode: true,
      updateValue: title,
    }, () => {
      this.updateInputRef.current.focus();
    });
  };

  handleUpdateInputChange = (event) => {
    this.setState({
      updateValue: event.target.value,
    });
  };

  handleUpdateInputKeyDown = (event) => {
    const { updateValue } = this.state;
    const { id, onUpdate } = this.props;

    const { keyCode } = event;

    if (keyCode === KEYCODE.ENTER && updateValue !== '') {
      onUpdate(id, updateValue);

      this.setState({
        inEditMode: false,
        updateValue: '',
      });
    } else if (keyCode === KEYCODE.ESC) {
      this.setState({
        inEditMode: false,
        updateValue: '',
      });
    }
  };

  render() {
    const { inEditMode, updateValue } = this.state;
    const { title, completed, index, onToggle, onRemove } = this.props;

    return (
      <li
        className={classNames({
          completed,
          editing: inEditMode,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${index}`}
            checked={completed ? 'checked' : ''}
            onChange={onToggle}
          />
          <label htmlFor={`todo-${index}`}>
            {title}
          </label>
          <button
            type="button"
            className="edit-btn js-edit-btn"
            onClick={this.handleEditButtonClick}
            title="edit"
          />
          <button
            type="button"
            className="destroy"
            onClick={onRemove}
            title="delete"
          />
        </div>
        <input
          type="text"
          className="edit js-edit-input"
          ref={this.updateInputRef}
          value={updateValue}
          onChange={this.handleUpdateInputChange}
          onKeyDown={this.handleUpdateInputKeyDown}
          onBlur={this.handleUpdateInputBlur}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
};
