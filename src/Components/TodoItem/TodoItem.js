import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    editingId: '',
    actualTodoData: '',
  }

  setEditField = (id) => {
    this.setState({
      isEditing: true,
      editingId: id,
    });
  }

  updField = (data) => {
    this.setState({ actualTodoData: data });
  }

  hideEditField = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { todo, statusHandler, handleTaskRemover, updateTask } = this.props;
    const { actualTodoData, editingId } = this.state;

    return (
      <li
        className={cn({
          completed: todo.completed,
          editing: this.state.isEditing,
        })}

        onDoubleClick={(e) => {
          this.setState({ actualTodoData: todo.title });
          this.setEditField(e.target.id);
        }}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onChange={() => {
              statusHandler(todo.id);
            }}
          />
          <label
            id={todo.id}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleTaskRemover(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.actualTodoData}
          onChange={(e) => {
            this.updField(e.target.value);
          }}
          onKeyDown={(e) => {
            const currentKey = e.key;

            if (currentKey === 'Enter' && actualTodoData.length === 0) {
              handleTaskRemover(editingId);
              this.hideEditField();
            } else if (currentKey === 'Enter') {
              updateTask(actualTodoData, editingId);
              this.hideEditField();
            } else if (e.keyCode === 27) {
              this.hideEditField();
            }
          }}
          onBlur={() => {
            updateTask(actualTodoData, editingId);
            this.hideEditField();
          }}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleTaskRemover: PropTypes.func.isRequired,
  statusHandler: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TodoItem;
