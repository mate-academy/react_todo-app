import React from 'react';
import PropTypes from 'prop-types';
import { TodosShape } from '../Shapes/TodosShape';

export class TodoList extends React.Component {
  state = {
    edited: '',
    editing: false,
  }

  startEditText = (event) => {
    this.setState({
      editing: true,
    });

    const todo = event.currentTarget;

    if (!todo.className) {
      todo.className = 'editing';
    }
  }

  addEditText = (event) => {
    this.setState({
      edited: event.target.value,
    });
  }

  finishEditText = id => (event) => {
    const input = event.target;

    if (event.keyCode === 13) {
      if (this.state.edited) {
        this.props.edit(this.state.edited, id);
        input.parentElement.className = '';
      } else {
        input.parentElement.className = '';
      }
    }

    this.setState({
      editing: false,
    });
  }

  blur = id => (event) => {
    const input = event.target;

    if (this.state.edited) {
      this.props.edit(this.state.edited, id);
      input.parentElement.className = '';
    } else {
      input.parentElement.className = '';
    }

    this.setState({
      editing: false,
    });
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todo => (
          <li
            className={todo.completed ? 'completed' : ''}
            onDoubleClick={this.startEditText}
            key={todo.id}
          >
            <div className="view">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="toggle"
                id={todo.id}
                onClick={() => this.props.check(todo.id)}
              />
              <span htmlFor={todo.id}>{todo.todo}</span>
              <button
                type="button"
                className="destroy"
                onClick={() => this.props.remove(todo.id)}
              />
            </div>
            {
              this.state.editing
                ? (
                  <input
                    type="text"
                    className="edit"
                    onChange={this.addEditText}
                    onKeyDown={this.finishEditText(todo.id)}
                    onBlur={this.blur(todo.id)}
                    ref={input => input && input.focus()}
                    value={todo.todo}
                  />
                )
                : <></>
            }
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  check: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  todos: TodosShape.isRequired,
};
