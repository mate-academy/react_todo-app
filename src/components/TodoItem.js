import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { todosPropTypes } from './propTypes';

class TodoItem extends React.Component {
  state = {
    isEdit: false,
    length: this.props.todos.length,
    editTitle: this.props.title,
  };

  activateTextInput = () => (
    this.setState({
      isEdit: true,
    })
  );

  editTitle = ({ target }) => (
    this.setState({
      editTitle: target.value,
    })
  );

  submitChangeTitle = (event, title, id) => {
    if (event.key === 'Escape') {
      this.setState({
        isEdit: false,
      });
    } else if (event.key === 'Enter') {
      this.props.changeTitle(title, id);
      this.setState({
        isEdit: false,
      });
    }
  };

  render() {
    const {
      id,
      title,
      completed,
      changeCompleted,
      deleteTodo,
      index,
    } = this.props;
    const { isEdit, editTitle } = this.state;

    return (
      <>
        <li className={ClassNames('item', {
          completed,
          editing: isEdit,
        })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
              checked={completed}
              onChange={() => (changeCompleted(id))}
            />
            <label
              htmlFor={id}
              onDoubleClick={this.activateTextInput}
            >
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => deleteTodo(index)}
            />
          </div>
          <input
            type="text"
            className="edit"
            onKeyDown={event => this.submitChangeTitle(event, editTitle, id)}
            onChange={this.editTitle}
            value={editTitle}
          />
        </li>
      </>
    );
  }
}

TodoItem.propTypes = {
  todos: todosPropTypes.isRequired,
  title: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default TodoItem;
