import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoItem extends React.PureComponent {
  render() {
    const { deleteTodo, todo, changeStatus } = this.props;

    return (

      <>
        <li key={todo.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={todo.id}
              checked={todo.completed}
              onChange={() => changeStatus(todo.id)
              }
            />
            <label
              className={classNames({ activeTodo: todo.completed })}
              htmlFor="todo"
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
};

export default TodoItem;
