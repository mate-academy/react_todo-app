import React from 'react';

class Todo extends React.Component {
  render() {
    const { todo, changeCompleted, removeTodo} = this.props;

    return (
      <div className="view">
        <input
          type="checkbox"
          name="completed"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => changeCompleted(todo.id)}
        />
        <label
          htmlFor={`todo-${todo.id}`}
        >
          { todo.title }
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    );
  }

}

export default Todo;
