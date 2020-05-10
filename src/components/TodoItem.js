import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  // state= {
  //   targetTitle: this.props.title,
  // }

  // handleChangeTargetTitle = (event) => {
  //   this.setState({
  //     targetTitle: event.target.value,
  //   });
  // }

  render() {
    const { title, id, completed, toggleComplete, removeTodo } = this.props;
    // const { targetTitle } = this.state;

    return (
      <li className={cn({ completed })}>
        <form>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${id}`}
              // checked={completed}
              checked={!!completed}
              onChange={() => toggleComplete(id)}
            />
            <label
              htmlFor={id}
              onDoubleClick={this.handleStartEdit}
            >
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => removeTodo(id)}
            />
          </div>
          <input
            type="text"
            className="edit"
            defaultValue={title}
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
  removeTodo: PropTypes.func.isRequired,
};
