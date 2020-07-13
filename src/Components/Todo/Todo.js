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
    const { value } = event.target;

    const chackedValue = this.#replaceSpace(value);

    this.setState({
      value: chackedValue,
    });
  }

  onBlur = (event) => {
    const { value, id } = event.target;

    const chackedValue = this.#replaceSpace(value);

    if (!chackedValue) {
      this.setState({
        value: this.props.todo.title,
        isEdit: false,
      });

      return;
    }

    this.updateTodos(value, id);
  }

  handleKeyUp = (event) => {
    const { value, id } = event.target;

    const chackedValue = this.#replaceSpace(value);

    if (event.key === 'Enter' && chackedValue) {
      this.updateTodos(value, id);
    } else if (event.key === 'Escape'
    || (event.key === 'Enter' && !chackedValue)) {
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

  #replaceSpace = value => value.replace(/\s+/g, ' ').replace(/^\s+$/, '')

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
          onKeyUp={this.handleKeyUp}
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
