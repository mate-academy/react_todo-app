import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
  }

  selectItem = () => {
    this.setState((prev) => {
      const status = !prev.completed;
      const { setActive, todo } = this.props;

      setActive(todo.id, !status);

      return {
        completed: status,
      };
    });
  }

  destroyTodo = () => {
    const { deleteTodo, todo } = this.props;

    deleteTodo(todo.id);
  }

  render() {
    const { todo } = this.props;

    return (
      <li
        onClick={this.selectItem}
        className={todo.isActive ? '' : 'completed'}
      >
        <div className="view">
          <input
            type="checkbox"
            checked={!todo.isActive}
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label
            onClick={this.selectItem}
            htmlFor={`todo-${todo.id}`}
          >
            {todo.task}
          </label>
          <button
            onClick={this.destroyTodo}
            type="button"
            className="destroy"
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  setActive: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    isActive: PropTypes.bool,
    task: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
