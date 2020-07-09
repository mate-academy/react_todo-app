import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ShapeTodo } from '../../Shapes/Shapes';

export class Todo extends Component {
  state = {
    value: this.props.todo.title,
    isEdit: false,
  }

  onEdit = () => {
    this.setState({
      isEdit: true,
    });
  }

  onChangeTodo = (event) => {
    let { value } = event.target;

    value = value.replace(/\s+/g, ' ').replace(/^\s+$/, '');

    this.setState({
      value,
    });
  }

  onBlur = (event) => {
    const { value, id } = event.target;

    this.updateTodos(value, id);
  }

  handleKeyPress = (event) => {
    const { value, id } = event.target;

    if (event.key === 'Enter') {
      this.updateTodos(value, id);
    } else if (event.key === 'Escape') {
      this.setState({
        value: this.props.todo.title,
        isEdit: false,
      });
    }
  }

  updateTodos(value, id) {
    this.props.onChangeUpdate(value, id);

    this.setState({
      isEdit: false,
    });
  }

  render() {
    const {
      todo,
      onChangeCompleted,
      onDeleteTodo,
    } = this.props;

    const { isEdit, value } = this.state;

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: isEdit,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
            value={todo.id}
            checked={todo.completed}
            onChange={onChangeCompleted}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            onDoubleClick={this.onEdit}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDeleteTodo(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          id={todo.id}
          ref={input => input && input.focus()}
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChangeTodo}
          onKeyUp={this.handleKeyPress}
        />
      </li>
    );
  }
}

Todo.propTypes = {
  todo: ShapeTodo.isRequired,
  onChangeCompleted: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onChangeUpdate: PropTypes.func.isRequired,
};
