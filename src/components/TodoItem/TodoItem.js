import React from 'react';

class TodoItem extends React.Component {
  state = {
    e: 1,
  }

  render() {
    const {
      id,
      title,
      completed,
      destroyTodo,
      changeStatus,
    } = this.props;

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            name={id}
            id={id}
            checked={completed}
            onChange={() => changeStatus(id)}
          />
          <label htmlFor={id}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => destroyTodo(id)}
          />
        </div>
      </li>
    );
  }
}

export default TodoItem;
