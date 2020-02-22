import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KEYCODE } from '../utils/const';

export class TodoItem extends React.PureComponent {
  state = {
    inEdit: false,
    updateText: '',
  };

  updateInputRef = React.createRef();

  handleCheckboxToggle = () => {
    const { onToggle } = this.props;

    onToggle();
  };

  handleRemoveButtonClick = () => {
    const { onRemove } = this.props;

    onRemove();
  };

  handleGlobalClick = (evt) => {
    if (evt.target.closest('.js-edit-input')) {
      return;
    }

    window.removeEventListener('click', this.handleGlobalClick);

    const { updateText } = this.state;
    const { id, onUpdate } = this.props;

    this.setState({
      inEdit: false,
    });

    if (updateText !== '') {
      onUpdate(id, updateText);

      this.setState({
        updateText: '',
      });
    }
  }

  handleLabelDoubleClick = () => {
    const { title } = this.props;

    this.setState({
      inEdit: true,
      updateText: title,
    }, () => {
      this.updateInputRef.current.focus();
    });

    window.addEventListener('click', this.handleGlobalClick);
  };

  handleUpdateInputChange = (evt) => {
    this.setState({ updateText: evt.target.value });
  };

  handleUpdateInputKeyDown = (evt) => {
    const { updateText } = this.state;
    const { id, onUpdate } = this.props;

    const { keyCode } = evt;

    if (keyCode === KEYCODE.ENTER && updateText !== '') {
      onUpdate(id, updateText);

      window.removeEventListener('click', this.handleGlobalClick);

      this.setState({
        inEdit: false,
        updateText: '',
      });
    } else if (keyCode === KEYCODE.ESC) {
      window.removeEventListener('click', this.handleGlobalClick);

      this.setState({
        inEdit: false,
        updateText: '',
      });
    }
  };

  render() {
    const { inEdit, updateText } = this.state;
    const { title, completed, index } = this.props;

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
            onChange={this.handleCheckboxToggle}
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
            onClick={this.handleRemoveButtonClick}
          />
        </div>
        <input
          type="text"
          className="edit js-edit-input"
          ref={this.updateInputRef}
          value={updateText}
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
