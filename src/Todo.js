import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Todo extends React.Component {
  state = {
    newTitle: '',
    edit: false,
  }

  activateEditing =() => {
    this.setState(state => ({
      newTitle: this.props.todo.title,
      edit: !state.edit,
    }));
  }

  handlerChange =({ target }) => {
    this.setState({
      newTitle: target.value.trimLeft().replace(/(\s{2,})/, ' '),
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
    const { todo: { id, completed, title },
      changeTodoStatus,
      deleteTodo,
      editTodo } = this.props;

    const { newTitle, edit } = this.state;

    return (
      <li
        className={cn({
          editing: edit, completed,
        })}
      >
        {edit
          ? (
            <>
              <input
                onChange={this.handlerChange}
                onBlur={this.completeEdit}
                className="edit"
                value={newTitle}
                onKeyDown={e => editTodo(e, id, newTitle, this.escapeEditing)}
                // лінтер свариться на autoFocus;
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </>
          )

          : (
            <div className="view">
              <input
                onChange={() => changeTodoStatus(id)}
                type="checkbox"
                className="toggle"
                id={id}
                checked={completed}
              />
              <label
                onDoubleClick={this.activateEditing}
              >
                {title}
              </label>
              <button
                onClick={() => deleteTodo(id)}
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
