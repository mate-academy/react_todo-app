import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TodoItem extends React.Component {
  state = {
    isEditable: false,
    currentValue: this.props.todo.title,
  };

  changeEditMode = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
    }));
  }

  changeEditModeByKey = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        isEditable: false,
      });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      currentValue: value,
    });
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
