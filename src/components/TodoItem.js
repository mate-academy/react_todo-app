import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class TodoItem extends React.Component {
  state = {
    isEdit: false,
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
    } else if (event.key === 'Enter' && title.length > 0) {
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
    } = this.props;
    const { isEdit, editTitle } = this.state;

    return (
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
            onClick={() => deleteTodo(id)}
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
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
