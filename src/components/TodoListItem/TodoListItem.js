import React from 'react';
import PropTypes from 'prop-types';

export default class TodoListItem extends React.Component {
  state = {
    item: this.props.todoListItem
  };

  render() {
    const item = this.state.item;
    const { title, id } = item;
    const deleteTodo = this.props.deleteTodo;
    //const { completed } = this.state;

    let classNames = '';
    if (item.completed) {
      classNames += 'completed'
    };

    return (
      <>
        <li className={classNames}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={item.completed}
              id={id}
              onClick={() => this.props.onClickCompleted(item)}
            />
            <label htmlFor={id}>{title}</label>
            <button type="button" className="destroy"
              onClick={() => deleteTodo(id)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      </>
    )
  }
}

TodoListItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  };


