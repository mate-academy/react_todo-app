import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  state = {
    value: this.props.title,
    inEditing: false,
  };

  changeEditMode = () => {
    this.setState(state => ({
      inEditing: !state.inEditing,
    }));
  };

  changeValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  changeTodoTitle = () => {
    const { value } = this.state;
    const { id } = this.props;

    if (value.trim() === '') {
      return this.props.removeTodo(id);
    }

    this.setState({
      inEditing: false,
    });

    return this.props.editTodo(value, id);
  };

  render() {
    const { todo, removeTodo, onCompleted } = this.props;

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={onCompleted}
            checked={todo.completed}
          />

          {!this.state.inEditing
            ? (
              <label
                className="label"
                onDoubleClick={this.changeEditMode}
              >
                {todo.title}
              </label>
            )
            : (
              <form onSubmit={this.changeTodoTitle}>
                <input
                  type="text"
                  className="edit"
                  onChange={this.changeValue}
                  value={this.state.value}
                />
              </form>
            )
          }

          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TodoItem;
