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

  completeEdit = () => {
    this.setState(state => ({
      edit: false,
    }));
  }

  escapeEditing = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      this.setState({
        edit: false,
      });
    }
  }

  render() {
    const { todo,
      changeTodoStatus,
      deleteTodo,
      editTodo } = this.props;

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
              <input
                onChange={this.handlerChange}
                onBlur={this.completeEdit}
                className="edit"
                value={title}
                onKeyDown={e => editTodo(e, todo.id, title, this.escapeEditing)}
                // лінтер свариться на autoFocus;
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
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
  editTodo: PropTypes.func.isRequired,
};
