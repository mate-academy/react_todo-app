import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TodoItem extends React.Component {
  state = {
    isEditable: false,
    currentValue: this.props.todo.title,
  };

  changeEditMode = () => {
    let editableValue = this.state.currentValue;

    if (!editableValue || editableValue === ' ') {
      editableValue = this.props.todo.title;
    }

    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
      currentValue: editableValue,
    }));
  }

  changeEditModeByKey = (event) => {
    const { currentValue } = this.state;
    let { isEditable } = this.state;

    if ((!currentValue || currentValue === ' ') && event.key === 'Enter') {
      isEditable = true;

      return isEditable;
    }

    if (event.key === 'Enter') {
      this.setState({
        isEditable: false,
      });
    }

    return {};
  }

  handleChange = (event) => {
    let { value } = event.target;

    value = value.replace(/[^\w ]/, '').replace(/\s+/g, ' ');

    this.setState({ currentValue: value });
  }

  render() {
    const { todo, onCheck, onRemove } = this.props;
    const { isEditable, currentValue } = this.state;

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: isEditable,
      })}
      >
        { isEditable
          ? (
            <input
              className="edit"
              value={currentValue}
              /* eslint-disable-next-line */
              autoFocus
              ref={this.inputRef}
              onChange={this.handleChange}
              onKeyPress={this.changeEditModeByKey}
              onBlur={this.changeEditMode}
              placeholder="Please, enter todo"
            />
          ) : (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={todo.id}
                onChange={() => onCheck(todo.id)}
                checked={todo.completed}
              />
              {/* eslint-disable-next-line */}
              <label onDoubleClick={this.changeEditMode}>
                {currentValue}
              </label>

              <button
                type="button"
                className="destroy"
                onClick={() => onRemove(todo.id)}
              />
            </div>
          )
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TodoItem;
