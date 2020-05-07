import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state= {
    titleInList: this.props.title,
  }

  render() {
    const { title, id, completed, toggleComplete } = this.props;
    const { titleInList } = this.state;

    return (
      <li className={cn({ completed })}>
        <form>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
              checked={completed}
              onChange={() => toggleComplete(id)}
            />
            <label
              htmlFor="todo-1"
            >
              {title}
              {id}
            </label>
            <button
              type="button"
              className="destroy"
            />
          </div>
          <input
            type="text"
            className="edit"
            value={titleInList}
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};
