import React from 'react';
import className from 'classnames';
import { TodoItemTypes } from './TodoItemShape';

export class TodoItem extends React.Component {
  state = {
    isEdited: false,
    temporaryTitle: this.props.title,
  }

  editTask = () => {
    this.setState(prevState => ({
      isEdited: !prevState.isEdited,
    }));
  }

  handleValue = (event) => {
    const { value } = event.target;
    const title = value.replace(/\s/, ' ').replace(/^\s/, '');

    this.setState(prevState => ({
      temporaryTitle: title,
    }));
  }

  onSubmit = (event) => {
    const taskId = event.target.name;
    const editedTitle = event.target.value;
    const { keyCode } = event;

    const onAddTask = this.props.onChangeCurrentTask;
    const previousTitle = this.state.temporaryTitle;

    if (keyCode === 27 || !keyCode) { // if user press Esc or click outside
      onAddTask(previousTitle, taskId);

      onAddTask(editedTitle, taskId);
      this.setState({
        isEdited: false,
        temporaryTitle: this.props.title,
      });
    }

    if (keyCode === 13) {
      onAddTask(editedTitle, taskId);

      onAddTask(editedTitle, taskId);
      this.setState(prevState => ({
        isEdited: false,
      }));
    }
  }

  render() {
    const {
      id,
      isCompleted,
      title,
      toggle,
      onDeleted,
    } = this.props;

    const { isEdited, temporaryTitle } = this.state;

    return (
      <li
        className={className({
          completed: isCompleted,
          editing: isEdited,
        })}
      >
        <div className="view">
          <input
            id={id}
            type="checkbox"
            className="toggle"
            value={id}
            onChange={toggle}
            checked={isCompleted}
          />
          <label
            htmlFor={id}
            value={id}
            onDoubleClick={this.editTask}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            value={id}
            onClick={onDeleted}
          />
        </div>
        <input
          name={id}
          type="text"
          className="edit"
          required
          ref={input => input && input.focus()}
          value={temporaryTitle}
          onChange={this.handleValue}
          onKeyUp={this.onSubmit}
          onBlur={this.onSubmit}
        />
      </li>
    );
  }
}

TodoItem.propTypes = TodoItemTypes;
