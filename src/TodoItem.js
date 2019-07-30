import React from 'react';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    currentTitle: this.props.todo.title,
  };

  handleChange = () => {
    const { todo, handleChangeItem } = this.props;

    handleChangeItem(todo.id, !todo.completed);
  };

  handleDestroy = () => {
    const { todo, handleDestroyItem } = this.props;

    handleDestroyItem(todo.id);
  };

  render() {
    const { todo } = this.props;

    return (
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          onChange={this.handleChange}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={this.handleDestroy}
        />
      </div>
    );
  }
}

export default TodoItem;
