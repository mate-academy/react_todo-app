import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    editTitle: this.props.todo.title,
  }

  editCurrentTitle = (e) => {
    this.setState({
      editTitle: e.target.value,
    });
  }

  render() {
    const { todo,
      statusOfTodo,
      handleRemoveTodo,
      handleEditTodo,
      handleEditTitle } = this.props;
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
          <label onDoubleClick={() => handleEditTodo(id, title)}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleRemoveTodo(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          id={id}
          value={editTitle}
          onChange={this.editCurrentTitle}
          onKeyDown={handleEditTitle}
          onBlur={handleEditTitle}
        />
      </>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  statusOfTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleEditTitle: PropTypes.func.isRequired,
};

export default TodoItem;
