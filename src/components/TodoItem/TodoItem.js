import React from 'react';
import { TodoItemTypes } from '../Shapes/Shapes';

export class TodoItem extends React.Component {
  state = {};

  render() {
    const {
      id,
      isCompleted,
      title,
      toggle,
      onDeleted,
      onEditTask,
    } = this.props;

    return (
      <>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            value={id}
            onChange={toggle}
            checked={isCompleted}
          />
          <label
            htmlFor={id}
            value={id}
            onDoubleClick={onEditTask}
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
        <input type="text" className="edit" />
      </>
    );
  }
}

TodoItem.propTypes = TodoItemTypes;
