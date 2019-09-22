import React from 'react';
import createClass from 'classnames';

class TodoItem extends React.Component {

  render() {
    const { todo: { id, title, completed }, deleteTodoFromData, changeTodoCompleteStatus } = this.props;
    const itemClass = createClass({ 'completed': completed });

    return (
      <li className={itemClass}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            data-todo-id={`${id}`}
            id={`todo-${id}`}
            checked={completed}
            onChange={changeTodoCompleteStatus}
          />
          <label htmlFor={`todo-${id}`}>{title}</label>
          <button type="button" className="destroy" data-todo-id={`${id}`} onClick={deleteTodoFromData} />
        </div>
      </li>
    );
  }
}

export default TodoItem;
