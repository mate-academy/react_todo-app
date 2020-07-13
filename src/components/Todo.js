import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from './Shapes';

export class Todo extends React.Component {
  state = {
    id: this.props.item.id,
    value: this.props.item.value,
    isCompleted: this.props.item.isCompleted,
  }

  onChange = () => {
    this.props.changeCompleteness(this.state.id);
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }));
  }

  render() {
    const { onChange } = this;
    const { id, value } = this.state;
    const { destroy } = this.props;
    const { isCompleted } = this.props.item;

    return (
      <li className={isCompleted ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            onChange={onChange}
          />
          <label htmlFor="todo-1">{value}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => destroy(id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

Todo.propTypes = {
  destroy: PropTypes.func.isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  item: TodoShape.isRequired,
};
