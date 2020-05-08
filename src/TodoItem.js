import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends React.PureComponent {
  render() {
    const { todo, deleteTodo, handleChangeStatus } = this.props;

    return (

      <>
        <li
          className={classNames({
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              id={todo.id}
              onChange={() => handleChangeStatus(todo.id)
              }
            />
            <label
              htmlFor={todo.id}
            >
              {todo.title}
            </label>
            <button
              id={todo.id}
              type="button"
              className="destroy"
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
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,

  handleChangeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,

};

export default TodoItem;
