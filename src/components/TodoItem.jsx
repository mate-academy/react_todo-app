import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    currentTitle: '',
    currentId: null,
  }

  handleStartEditing = () => {
    this.setState({
      isEditing: true,
      currentTitle: this.props.todo.title,
      currentId: this.props.todo.id,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { currentTitle, currentId } = this.state;

    if (this.state.currentTitle) {
      this.props.onChangeSubmit(currentTitle, currentId);

      this.setState({
        currentTitle: '',
        isEditing: false,
      });
    }
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { todo, handleTodoToggle, handleDestroyTodo } = this.props;
    const { isEditing, currentTitle } = this.state;

    return (
      <li>
        <div className="view">
          <input
            checked={todo.completed}
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={() => handleTodoToggle(todo.id)}
          />

          {isEditing
            ? (
              <form onSubmit={this.handleFormSubmit}>
                <input
                  onChange={this.handleFieldChange}
                  value={currentTitle}
                  name="currentTitle"
                  autoComplete="off"
                  className="new-todo"
                  placeholder="What needs to be done?"
                />
              </form>
            )
            : (
              /* eslint-disable-next-line */
              <label
                className={todo.completed ? 'todo--completed' : null}
                htmlFor={todo.id}
                onDoubleClick={this.handleStartEditing}
              >
                {todo.title}

              </label>
            )
          }

          <button
            onClick={() => handleDestroyTodo(todo.id)}
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
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  }).isRequired,
  handleTodoToggle: PropTypes.func,
  handleDestroyTodo: PropTypes.func,
  onChangeSubmit: PropTypes.func,
};

TodoItem.defaultProps = {
  handleTodoToggle: () => {},
  handleDestroyTodo: () => {},
  onChangeSubmit: () => {},
};

export default TodoItem;
