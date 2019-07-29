import React from 'react';

class TodoItem extends React.Component {
  handleChange = () => {
    const { todo, handleChangeItem } = this.props;

    handleChangeItem(todo.id, !todo.completed);
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
        <button type="button" className="destroy" />
      </div>
    );
  }
}

export default TodoItem;
