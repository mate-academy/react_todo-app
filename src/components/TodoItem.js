import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import TodoEdit from './TodoEdit';

class TodoItem extends React.Component {
  state = {
    editing: false,
  }

  turnOffEditing = () => {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { todo, isCompleted, deleteTodo, fixTodo } = this.props;
    const liClass = ClassNames(
      { completed: todo.completed },
      { editing: this.state.editing }
    );

    return (
      <li className={liClass}>
        <div className="view">
          <input
            id={todo.id}
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={event => isCompleted(event.target.checked, todo.id)}
          />
          {/* eslint-disable-next-line */}
          <label
            htmlFor={todo.id}
            onDoubleClick={() => this.setState({ editing: true })}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        {this.state.editing && (
          <TodoEdit
            title={this.props.todo.title}
            id={this.props.todo.id}
            fixTodo={fixTodo}
            turnOffEditing={this.turnOffEditing}
          />
        )}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  fixTodo: PropTypes.func.isRequired,
};

export default TodoItem;
