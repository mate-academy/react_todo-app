import React from 'react';
import cn from 'classnames/bind';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  state = {
    value: '',
    isClicked: false,
  }

  handleClick = (todoTitle) => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
      value: todoTitle,
    }));
  }

  editTitle = ({ target }) => {
    this.setState({
      value: target.value,
    });
  }

   handleBlur = (todoId) => {
     this.finishEditedTodo(todoId);
   }

  finishEditedTodo = (todoId) => {
    const { value } = this.state;

    if (value.length > 0) {
      this.props.saveChangesTodo(todoId, value);
      this.handleClick();
    } else {
      this.props.deleteTodo(todoId);
      this.handleClick();
    }
  }

  onKeyDown = (e, todoId) => {
    if (e.key === 'Enter') {
      this.finishEditedTodo(todoId);
    }

    if (e.key === 'Escape') {
      this.handleClick();
    }
  }

  render() {
    const {
      id,
      title,
      completed,
      onSelected,
      deleteTodo,
    } = this.props;

    const { isClicked } = this.state;

    return (
      <li className={cn({ completed }, { editing: isClicked })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={onSelected}
          />
          <label
            onDoubleClick={() => this.handleClick(title)}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(id)}
          />
        </div>
        {isClicked && (
          <input
            type="text"
            className="edit"
            onBlur={() => this.handleBlur(id)}
            defaultValue={title}
            onChange={this.editTitle}
            onKeyDown={e => this.onKeyDown(e, id)}
            /* eslint-disable jsx-a11y/no-autofocus */
            autoFocus
          />
        )}
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onSelected: PropTypes.func,
  deleteTodo: PropTypes.func,
  saveChangesTodo: PropTypes.func,
};

Todo.defaultProps = {
  onSelected: () => {},
  deleteTodo: () => {},
  saveChangesTodo: () => {},
};

export default Todo;
