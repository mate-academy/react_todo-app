import React, { Component } from 'react';

class TodoListenItem extends Component {
  constructor() {
    super();

    this.state = {
      completed: false,
    };
  }

  render() {
    const {
      id,
      label,
      onDeleted,
      onToggleDone,
      completed
    } = this.props;

    console.log('props', this.props);
    console.log('props', this.state);

    const classNames = completed ? 'completed' : '';

    return (
      <li className={classNames} key={id} onClick={onToggleDone}>
        <div className="view">
          <input type="checkbox" className="toggle" id={`todo-${id}`} />
          <label htmlFor={`todo-${id}`}>{label}</label>
          <button
            type="button"
            className="destroy"
            onClick={onDeleted}
          />
        </div>
      </li>
    );
  }
}

export default TodoListenItem;
