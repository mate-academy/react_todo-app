import React from 'react';

export class Todo extends React.Component {
  state = {
    decoration: (this.props.completed === true) ? 'line-through' : 'none',
  }

  checkExecution = (ev) => {
    (ev.target.checked || this.props.completed)
      ? this.props.onComplete(ev.target.nextElementSibling.textContent, true)
      : this.props.onComplete(ev.target.nextElementSibling.textContent, false);

    const decor = (this.props.completed) ? 'none' : 'line-through';

    this.setState(() => ({
      decoration: decor,
    }));
  };

  render() {
    const isVisible = ((this.props.completed && this.props.hideCompleted)
    || (!this.props.completed && this.props.hideActive))
      ? 'none'
      : 'block';

    return (
      <li style={{ display: isVisible }}>
        <div className="view">
          <input
            checked={this.props.completed}
            type="checkbox"
            className="toggle" id={this.props.title}
            onChange={ev => this.checkExecution(ev)}
          />
          <label
            htmlFor={this.props.title}
            style={{ textDecoration: this.state.decoration }}
          >
            {this.props.title}
          </label>
          <button
            type="button" className="destroy"
            onClick={ev => this.props.deleteTodo(ev)}
          />
        </div>
      </li>
    )
  }
}
