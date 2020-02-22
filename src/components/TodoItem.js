import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KEYCODE } from '../utils/const';

export class TodoItem extends React.PureComponent {
  state = {
    inEdit: false,
    updateText: '',
  };

  handleCheckboxToggle = () => {
    const { onToggle } = this.props;

    onToggle();
  };

  handleRemoveButtonClick = () => {
    const { onRemove } = this.props;

    onRemove();
  };

  handleLabelDoubleClick = () => {
    const { title } = this.props;

    this.setState({
      inEdit: true,
      updateText: title,
    });
  };

  handleUpdateInputChange = (evt) => {
    this.setState({ updateText: evt.target.value });
  };

  handleUpdateInputKeyDown = (evt) => {
    const { updateText } = this.state;
    const { id, onUpdate } = this.props;

    const { keyCode } = evt;

    if (keyCode === KEYCODE.ENTER) {
      onUpdate(id, updateText);

      this.setState({
        inEdit: false,
        updateText: '',
      });
    } else if (keyCode === KEYCODE.ESC) {
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
          className="edit"
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
