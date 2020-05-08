import React from 'react';

export default class TodoListItem extends React.Component {
  state = {
    completed: false
  };

  onClickCompleted = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed
      };
    });
  };

  render() {
    const { title, id, onClickDelete } = this.props?.todoListItem;
    const { completed } = this.state;

    let classNames = '';
    if (completed) {
      classNames += 'completed'
    }

    return (
      <>
        <li className={classNames}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
              onClick={this.onClickCompleted}
            />
            <label htmlFor={id}>{title}</label>
            <button type="button" className="destroy"
              onClick={/*this.*/onClickDelete}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      </>
    )
  }

}




