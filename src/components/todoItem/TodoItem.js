import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TodoItem extends React.Component {
  state = {
    isEdit: false,
    editedTodo: this.props.todoTitle,
  };

  handleDoubleClick = () => {
    this.setState({
      isEdit: true,
    });
  };

  onEditChange = ({ target }) => {
    this.setState({
      editedTodo: target.value,
    });
  };

  handleEditSubmit = () => {
    const {
      id,
      handleEdit,
      deleteClick,
    } = this.props;
    const { editedTodo } = this.state;

    this.setState({
      isEdit: false,
    });
    if (editedTodo !== '') {
      handleEdit(editedTodo, id);
    } else {
      deleteClick(id);
    }
  };

  render() {
    const {
      todoTitle,
      status,
      id,
      handleStatusClick,
      deleteClick,
    } = this.props;
    const { editedTodo } = this.state;
    const liClassName = cx({
      editing: this.state.isEdit,
      completed: status,
    });

    return (
      <li className={liClassName}>
        {!this.state.isEdit
          ? (
            <form className="view">
              <input
                type="checkbox"
                id={id}
                className="toggle"
                checked={status}
                onChange={() => handleStatusClick(id)}
              />
              <p
                className="label"
                onDoubleClick={this.handleDoubleClick}
              >
                {todoTitle}
              </p>
              <button
                type="button"
                className="destroy"
                onClick={() => deleteClick(id)}
              />
            </form>
          ) : (
            <form onSubmit={this.handleEditSubmit}>
              <input
                type="text"
                className="edit"
                value={editedTodo}
                onChange={value => this.onEditChange(value)}
              />
            </form>
          )
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleStatusClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default TodoItem;
