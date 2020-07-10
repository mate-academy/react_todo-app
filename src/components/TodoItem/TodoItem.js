import React from 'react';
import { TodoItemTypes } from '../Shapes/Shapes';

export class TodoItem extends React.Component {
  state = {
    editedTitle: this.props.title,
  }

  handleValue = (event) => {
    const titleValue = event.target.value.replace(/\s/, ' ').replace(/^\s/, '');

    this.setState(prevState => ({
      editedTitle: titleValue,
    }));
  }

  onSubmit = (event) => {
    const onAddTask = this.props.onChangeCurrentTask;
    const taskId = event.target.name;
    const { editedTitle } = this.state;
    const currentKeyCode = event.keyCode;

    onAddTask(editedTitle, taskId, currentKeyCode);
  }

  render() {
    const {
      id,
      isCompleted,
      title,
      toggle,
      onDeleted,
      onEdit,
    } = this.props;

    const { editedTitle } = this.state;

    return (
      <>
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
            onDoubleClick={onEdit}
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
          value={editedTitle}
          onChange={this.handleValue}
          onKeyDown={this.onSubmit}
          onBlur={this.onSubmit}
        />
      </>
    );
  }
}

TodoItem.propTypes = TodoItemTypes;
