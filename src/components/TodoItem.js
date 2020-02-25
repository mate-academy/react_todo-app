import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KEYCODE } from '../utils/const';

export class TodoItem extends React.PureComponent {
  state = {
    inEdit: false,
    updateValue: '',
  };

  updateInputRef = React.createRef();

  handleGlobalClick = (event) => {
    if (
      event.target.closest('.js-edit-input')
      || event.target.closest('.js-edit-btn')
    ) {
      return;
    }

    window.removeEventListener('click', this.handleGlobalClick);

    const { updateValue } = this.state;
    const { id, onUpdate } = this.props;

    this.setState({
      inEdit: false,
    });

    if (updateValue !== '') {
      onUpdate(id, updateValue);

      this.setState({
        updateValue: '',
      });
    }
  }

  handleEditButtonClick = () => {
    const { title } = this.props;

    this.setState({
      inEdit: true,
      updateValue: title,
    }, () => {
      this.updateInputRef.current.focus();
    });

    window.addEventListener('click', this.handleGlobalClick);
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

      window.removeEventListener('click', this.handleGlobalClick);

      this.setState({
        inEdit: false,
        updateValue: '',
      });
    } else if (keyCode === KEYCODE.ESC) {
      window.removeEventListener('click', this.handleGlobalClick);

      this.setState({
        inEdit: false,
        updateValue: '',
      });
    }
  };

  render() {
    const { inEdit, updateValue } = this.state;
    const { title, completed, index, onToggle, onRemove } = this.props;

    return (
      <li
        className={classNames({
          completed,
          editing: inEdit,
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
          >
            &#128393;
          </button>
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
