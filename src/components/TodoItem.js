import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormForTodoItem from './FormForTodoItem';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      doubleClicked: false,
    };
    this.ShowOrHideForm = this.ShowOrHideForm.bind(this);
    this.ChangeTitle = this.ChangeTitle.bind(this);
  }

  changeStatus() {
    this.props.change(this.props.todo);
  }

  delete() {
    this.props.destroy(this.props.todo);
  }

  ShowOrHideForm() {
    const { doubleClicked } = this.state;

    this.setState({ doubleClicked: !doubleClicked });
  }

  ChangeTitle(title) {
    this.props.changeTitle(this.props.todo, title);
    this.ShowOrHideForm();
  }

  render() {
    const { title, id, completed } = this.props.todo;
    const { doubleClicked } = this.state;
    let nameOfClass = completed ? 'completed' : '';

    nameOfClass = doubleClicked ? 'editing' : nameOfClass;

    const input = doubleClicked
      ? <FormForTodoItem title={title} ChangeTitle={this.ChangeTitle} />
      : '';

    return (
      <li className={nameOfClass}>
        <div className="view">
          <label
            onDoubleClick={this.ShowOrHideForm}
            className={completed ? `completed-label` : ''}
            htmlFor={`todo-${id}`}
          >
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${id}`}
              onChange={this.changeStatus}
              // checked={completed}
            />
            {title}
          </label>
          <button type="button" className="destroy" onClick={this.delete} />
        </div>
        {input}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  change: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

export default TodoItem;
