import React from 'react';
import propTypes from './propTypes';

class TodoList extends React.Component {
  state = {
    todoValue: this.props.todo.todo,
    open: false,
  };

  edit = () => {
    this.setState({ open: true });
  };

  todoChange = (event) => {
    this.setState({ todoValue: event.target.value });
  };

  discardChange = (event) => {
    if (event.keyCode === 27) {
      this.setState({ open: false });
    }
  };

  render() {
    const {
      todo,
      onCheck,
      onRemove,
      editTodo,
    } = this.props;

    return (
      <>
        {
          !this.state.open ? (
            <label htmlFor={`toggle${todo.id}`} className="view">
              <input
                type="checkbox"
                className="toggle"
                id={`toggle${todo.id}`}
                onChange={() => onCheck(todo.id)}
                checked={todo.completed}
              />
              <span
                onDoubleClick={() => { this.edit(todo.id); }}
                className={todo.completed ? 'active' : ''}
              >
                {todo.todo}
                <button
                  type="button"
                  className="destroy"
                  onClick={() => {
                    onRemove(todo.id);
                  }}
                />
              </span>
            </label>
          )
            : (
              <form onSubmit={(event) => {
                event.preventDefault();
                editTodo(todo.id, this.state.todoValue);
                this.setState({ open: false });
              }}
              >
                <input
                  onKeyDown={this.discardChange}
                  ref={input => input && input.focus()}
                  type="text"
                  className="edit"
                  value={this.state.todoValue}
                  onChange={this.todoChange}
                />
              </form>
            )
        }
      </>
    );
  }
}

TodoList.propTypes = propTypes.state;

export default TodoList;
