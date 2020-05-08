import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Todo extends React.Component {
  state = {
    title: '',
    edit: false,
  }

  activateEditing =() => {
    this.setState(state => ({
      title: this.props.todo.title,
      edit: !state.edit,
    }));
  }

  handlerChange =({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  CompleteEdit = () => {
    this.setState(state => ({
      edit: false,
    }));
  }

  render() {
    const { todo,
      changeTodoStatus,
      deleteTodo,
      submitEditingTodo } = this.props;

    const { title, edit } = this.state;

    return (
      <li
        className={cn({
          editing: edit, completed: todo.completed,
        })}
      >
        {edit
          ? (
            <>
              <form onSubmit={() => submitEditingTodo(todo.id, title)}>
                <input
                  onChange={this.handlerChange}
                  onBlur={this.CompleteEdit}
                  id={todo.id}
                  className="edit"
                  value={title}
                  onFocus
                />
              </form>
            </>
          )

          : (
            <div className="view">
              <input
                onChange={() => changeTodoStatus(todo.id)}
                type="checkbox"
                className="toggle"
                id={todo.id}
                checked={todo.completed}
              />
              <label
                htmlFor={todo.id}
                onDoubleClick={this.activateEditing}
              >
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                type="button"
                className="destroy"
              />
            </div>
          )}
      </li>
    );
  }
}

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  submitEditingTodo: PropTypes.func.isRequired,
};
