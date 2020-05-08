import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
state = {
  onEdit: false,
  onEditTodoId: '',
}

  onEdit = (id) => {
    this.setState({
      onEdit: true,
      onEditTodoId: +id,
    });
  }

  saveChangeBlur = (event) => {
    const id = this.state.onEditTodoId;
    const newTitle = event.target.value;

    this.setState({
      onEdit: false,
    });
    this.props.changeTitle(id, newTitle);
  }

  onKeyPress = (event) => {
    const id = this.state.onEditTodoId;
    const newTitle = event.target.value;

    if (event.keyCode === 13) {
      this.setState({
        onEdit: false,
      });
      this.props.changeTitle(id, newTitle);
    }

    if (event.keyCode === 27) {
      this.setState({
        onEdit: false,
      });
    }
  }

  render() {
    const { deleteTodo, todo, changeStatus } = this.props;
    const { onEdit } = this.state;

    return (

      <>
        <li
          key={todo.id}
          className={classNames({
            view: true,
            editing: onEdit,
            completed: todo.completed,
          })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={todo.id}
              checked={todo.completed}
              onChange={() => changeStatus(todo.id)}
            />
            <label
              htmlFor="todo"
              onDoubleClick={() => this.onEdit(todo.id)}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              id={todo.id}
              onClick={deleteTodo}
            />
          </div>
          <input
            type="text"
            className="edit"
            defaultValue={todo.title}
            onBlur={this.saveChangeBlur}
            onKeyDown={this.onKeyPress}
          />
        </li>
      </>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

export default TodoItem;
