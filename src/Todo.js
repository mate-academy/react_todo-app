import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  state = {
    title: this.props.todo.title,
    activeRename: false,
  }

  handleRename = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  }

  handleStart = () => {
    this.setState({
      activeRename: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { renameTodo, todo } = this.props;

    if (this.state.title) {
      renameTodo(this.state.title, todo.id);
      this.setState({
        activeRename: false,
      });
    }
  }

  render() {
    const { todo, toggle, deleteTodo } = this.props;
    const { id, completed } = todo;
    const { activeRename, title } = this.state;

    return (
      <li className="todo">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            onChange={() => toggle(id)}
            checked={completed}
          />
          {
            activeRename
              ? (
                <form
                  onSubmit={this.handleSubmit}
                >
                  <input
                    type="text"
                    onChange={this.handleRename}
                    value={title}
                    className="new-todo"
                  />
                </form>
              ) : (
                <>
                  <label
                    onDoubleClick={this.handleStart}
                    htmlFor="todo-2"
                  >
                    {todo.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => deleteTodo(id)}
                  />
                  <p>{completed}</p>
                </>
              )
          }

        </div>
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number,
  }).isRequired,
  toggle: PropTypes.func,
  deleteTodo: PropTypes.func.isRequired,
  renameTodo: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  toggle: null,
};

export default Todo;
