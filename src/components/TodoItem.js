import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state = {
    isEdit: false,
    currentTitle: this.props.title,
  }

  startEditing = () => {
    this.setState({
      isEdit: true,
      currentTitle: this.props.title,
    });
  }

  handleCurrentTitleEdit = (event, id) => {
    if (event.key === 'Escape') {
      this.setState({
        isEdit: false,
        currentTitle: this.props.title,
      });
    }

    if (event.key !== 'Enter' && event.type !== 'blur') {
      return;
    }

    this.setState({
      isEdit: false,
    });
    this.props.editTitleTodo(event.target.value, id);
  }

  render() {
    const { title, id, completed, toggleComplete, removeTodo } = this.props;
    const { isEdit, currentTitle } = this.state;

    return (
      <li
        className={cn({ completed }, { editing: isEdit })}
      >
        <form>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${id}`}
              checked={completed}
              onChange={() => toggleComplete(id)}
            />
            <label
              htmlFor={id}
              onDoubleClick={this.startEditing}
            >
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => removeTodo(id)}
            />
          </div>
          {isEdit && (
            <input
              type="text"
              className="edit"
              defaultValue={currentTitle}
              ref={this.textInput}
              onBlur={event => this.handleCurrentTitleEdit(event, id)}
              onKeyDown={event => this.handleCurrentTitleEdit(event, id)}
              /* eslint-disable jsx-a11y/no-autofocus */
              autoFocus
            />
          )}
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTitleTodo: PropTypes.func.isRequired,
};
