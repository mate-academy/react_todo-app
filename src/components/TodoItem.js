import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    editTitle: '',
  }

  editCurrentTitle = (e) => {
    this.setState({
      editTitle: e.target.value,
    });
  }

  handleEditTitle = ({ key, target, type }) => {
    const { setTodoTitle, todo } = this.props;
    const { id } = target;

    if ((key === 'Enter' && target.value.trim() !== '')
    || (type === 'blur' && target.value.trim() !== '')) {
      setTodoTitle(id, target.value.trim());
    }

    if (key === 'Escape') {
      this.setState({ editTitle: todo.title });
      setTodoTitle(id, todo.title);
    }
  }

  handleDoubleClick = () => {
    const { todo, setEditStatus } = this.props;
    const { id, title } = todo;

    this.setState({ editTitle: title });
    setEditStatus(id);
  }

  render() {
    const {
      todo,
      statusOfTodo,
      handleRemoveTodo,
    } = this.props;
    const { id, title, completed } = todo;
    const { editTitle } = this.state;

    return (
      <>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={() => statusOfTodo(id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleRemoveTodo(id)}
          />
        </div>
        {todo.editing && (
          <input
            type="text"
            className="edit"
            id={id}
            value={editTitle}
            onChange={this.editCurrentTitle}
            onKeyDown={this.handleEditTitle}
            onBlur={this.handleEditTitle}
          />
        )}
      </>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  statusOfTodo: PropTypes.func.isRequired,
  setEditStatus: PropTypes.func.isRequired,
  setTodoTitle: PropTypes.func.isRequired,
};

export default TodoItem;
