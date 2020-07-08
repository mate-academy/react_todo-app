import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {}

  render() {
    const {
      todosList,
      onChangeCompleted,
      onDeleteTodo,
    } = this.props;

    return (
      <ul className="todo-list">
        {todosList.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id="todo-1"
                value={todo.id}
                checked={todo.completed}
                onChange={onChangeCompleted}
              />
              <label htmlFor="todo-1">{todo.title}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => onDeleteTodo(todo.id)}
              />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onChangeCompleted: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
