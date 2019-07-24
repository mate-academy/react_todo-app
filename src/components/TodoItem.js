import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state={
    todoEditValue: '',
    editingId: '',
  }

  handleEdit = (id) => {
    this.setState({
      editingId: id,
      todoEditValue: this.props.todo.title,
    });
  }

  handleTypeEdit = (event) => {
    this.setState({
      todoEditValue: event.target.value,
    });
  };

  isExistingAndUnique = (value, arr) => {
    if (value && !arr.some(item => item.title === value)) {
      return true;
    }
    return false;
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      const { todoEditValue, editingId } = prevState;
      const { todoItemsArr, rewriteExistingTodo } = this.props;

      if (this.isExistingAndUnique(todoEditValue, todoItemsArr)) {
        rewriteExistingTodo(todoEditValue, editingId);

        return ({
          todoEditValue: '',
          editingId: '',
        });
      }

      return ({
        todoEditValue: prevState.todoEditValue,
        editingId: '',
      });
    });
  }

  render() {
    const { todo, handleCompletedOrDestroy } = this.props;
    const { editingId, todoEditValue } = this.state;
    let classes = ' ';

    if (todo.completed) {
      classes = 'completed';
    }

    if (todo.id === editingId) {
      classes += ' editing';
    }

    return (
      <li
        onDoubleClick={() => this.handleEdit(todo.id)}
        className={classes}
      >
        <div>
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => handleCompletedOrDestroy(todo.id, 'completed')}
          />

          <label
            className="view"
            htmlFor="todo-1"
          >
            {todo.title}
          </label>

          <form onSubmit={this.handleSubmitEdit}>
            <input
              name="editInput"
              className="edit"
              type="text"
              value={todoEditValue}
              onChange={this.handleTypeEdit}
            />
          </form>

          <button
            onClick={() => handleCompletedOrDestroy(todo.id, 'destroy')}
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

  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCompletedOrDestroy: PropTypes.func.isRequired,
  rewriteExistingTodo: PropTypes.func.isRequired,
};

export default TodoItem;
