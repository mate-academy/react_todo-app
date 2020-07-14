import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from './Shapes';

export class Todo extends React.Component {
  state = {
    id: this.props.item.id,
    value: this.props.item.value,
    isCompleted: this.props.item.isCompleted,
    editMode: '',
  }

  onChange = () => {
    this.props.changeCompleteness(this.state.id);
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }));
  }

  setEditMode = () => {
    this.setState({
      editMode: 'editing',
    });
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({ value: value.trimStart() });
  }

  handleEndEditing = (event) => {
    if (event.keyCode === 13) {
      const { id, value } = this.state;
      const { handleTodoEdit } = this.props;

      this.setState({
        editMode: '',
      });

      handleTodoEdit(id, value);
    }
  }

  handleEndEditingOnBlur = () => {
    const { id, value } = this.state;
    const { handleTodoEdit } = this.props;

    this.setState({
      editMode: '',
    });

    handleTodoEdit(id, value);
  }

  render() {
    const { onChange,
      setEditMode,
      handleInput,
      handleEndEditing,
      handleEndEditingOnBlur } = this;
    const { id, value, editMode } = this.state;
    const { destroy } = this.props;
    let { isCompleted } = this.props.item;

    if ((typeof isCompleted) === 'boolean') {
      if (isCompleted) {
        isCompleted = 'completed';
      } else if (!isCompleted) {
        isCompleted = '';
      }
    }

    return (
      <li className={`${editMode || isCompleted}`}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={!!isCompleted}
            onChange={onChange}
          />
          <label htmlFor="todo-1" onDoubleClick={setEditMode}>{value}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => destroy(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={value}
          onChange={handleInput}
          onKeyDown={handleEndEditing}
          onBlur={handleEndEditingOnBlur}
        />
      </li>
    );
  }
}

Todo.propTypes = {
  destroy: PropTypes.func.isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  item: TodoShape.isRequired,
  handleTodoEdit: PropTypes.func.isRequired,
};
