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

  handleGlobalClick = (evt) => {
    if (evt.target.closest('.js-edit-input')) {
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

  handleLabelDoubleClick = () => {
    const { title } = this.props;

    this.setState({
      inEdit: true,
      updateValue: title,
    }, () => {
      this.updateInputRef.current.focus();
    });

    window.addEventListener('click', this.handleGlobalClick);
  };

  handleUpdateInputChange = (evt) => {
    this.setState({
      updateValue: evt.target.value,
    });
  };

  handleUpdateInputKeyDown = (evt) => {
    const { updateValue } = this.state;
    const { id, onUpdate } = this.props;

    const { keyCode } = evt;

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
          <label
            htmlFor={`todo-${index}`}
            onDoubleClick={this.handleLabelDoubleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={onRemove}
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
