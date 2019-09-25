import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      title: this.props.todo.title,
    };

    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    this.textInput.current.focus();
  }

  showEditField = () => {
    this.setState({ isEdit: true });
  };

  updateTodo = (event) => {
    event.preventDefault();
    const { title } = this.state;
    const { onEdit, onDelete, todo } = this.props;

    if (title) {
      this.setState({ isEdit: false });
      onEdit(todo.id, title);
    } else {
      onDelete(todo.id);
    }
  };

  editTodo = ({ target }) => {
    this.setState({ title: target.value });
  };

  render() {
    const { todo, onDelete, onComplete } = this.props;
    const { title, isEdit } = this.state;
    const todoClassList = classNames({
      completed: todo.completed,
      editing: isEdit,
    });

    return (
      <li className={todoClassList}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            id={todo.id}
            onChange={() => onComplete(todo.id)}
          />
          <label
            htmlFor="todo-1"
            onDoubleClick={this.showEditField}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDelete(todo.id)}
          />
        </div>
        <form action="" onSubmit={e => this.updateTodo(e)}>
          <input
            type="text"
            value={title}
            ref={this.textInput}
            className="edit"
            onChange={this.editTodo}
            onBlur={this.updateTodo}
          />
        </form>
      </li>
    );
  }
}
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default TodoItem;
