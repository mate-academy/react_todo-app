import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends PureComponent {
  render() {
    const { id, title, completed, editing } = this.props.todoItem;
    const { checkBoxChange, btnDestroyClick, onDoubleClick, editInputPressKey } = this.props;

    return (
      <li
        className={completed ? 'completed' : ''}
        data-id={id}
        onDoubleClick={onDoubleClick}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={checkBoxChange}
            data-id={id}
          />
          <label htmlFor={id}>{title}</label>
          <button type="button" className="destroy" data-id={id} onClick={btnDestroyClick} />
        </div>
        {editing && (
          <input
            className="edit"
            autoFocus={true}
            defaultValue={title}
            onKeyPress={editInputPressKey}
            data-id={id}
          />
        )
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
  }).isRequired,
  checkBoxChange: PropTypes.func.isRequired,
  btnDestroyClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  editInputPressKey: PropTypes.func.isRequired,
};

export default TodoItem;
