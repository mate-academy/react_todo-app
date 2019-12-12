import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

class TodoItem extends React.Component {
  state={
    todoEditValue: '',
    isTodoEditing: false,
  }

  handleEdit = () => {
    this.setState({
      isTodoEditing: true,
      todoEditValue: this.props.todo.title,
    });
  }

  handleTypeEdit = (event) => {
    this.setState({
      todoEditValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { todos, rewriteExistingTodo, isExistingAndUnique } = this.props;
    const { todoEditValue } = this.state;

    if (isExistingAndUnique(todoEditValue, todos)) {
      rewriteExistingTodo(todoEditValue, this.props.todo.id);

      this.setState({
        todoEditValue: '',
      });
    }

    this.setState({
      isTodoEditing: false,
    });
  }

  render() {
    const { todo, toggleComplete, destroyItem } = this.props;
    const { isTodoEditing, todoEditValue } = this.state;

    const todoItemClasses = classNames({
      completed: todo.completed,
      editing: isTodoEditing,
    });

    return (
      <li className={todoItemClasses}>
        <div onDoubleClick={this.handleEdit}>
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />

          <label
            className="view"
            htmlFor="todo-1"
          >
            {todo.title}
          </label>

          <form onSubmit={this.handleSubmit}>
            <input
              name="editInput"
              className="edit"
              type="text"
              value={todoEditValue}
              onChange={this.handleTypeEdit}
            />
          </form>

          <button
            onClick={() => destroyItem(todo.id)}
            type="button"
            className="destroy"
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,

  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
  rewriteExistingTodo: PropTypes.func.isRequired,
  isExistingAndUnique: PropTypes.func.isRequired,
};

export default TodoItem;
