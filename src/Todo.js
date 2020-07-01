import React from 'react';
import { ShapeTodo } from './Shapes';

export class Todo extends React.Component {
  state = {
    decoration: 'none',
  }

  checkExecution = (ev) => {
    // else {
    //   const decor = (this.props.completed) ? 'none' : 'line-through';

    //   this.setState(() => ({
    //     decoration: decor,
    //   }));
    // }

    (ev.target.checked)
      ? this.props.onComplete(ev.target.nextElementSibling.textContent, true)
      : this.props.onComplete(ev.target.nextElementSibling.textContent, false);

    // if (!ev.target.checked && this.props.selected === true) {
    //   this.props.selectAll();
    // }
  };

  render() {
    const crossed = (this.props.selected || this.props.completed)
      ? 'line-through'
      : 'none';
    const invisible = ((this.props.completed && this.props.hideCompleted)
    || (!this.props.completed && this.props.hideActive))
      ? 'none'
      : 'block';

    return (
      <li style={{ display: invisible }}>
        <div className="view">
          <input
            checked={this.props.completed}
            type="checkbox"
            className="toggle"
            id={this.props.title}
            onChange={ev => this.checkExecution(ev)}
          />
          <label
            htmlFor={this.props.title}
            style={{ textDecoration: crossed }}
          >
            {this.props.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={ev => this.props.deleteTodo(ev)}
          />
        </div>
      </li>
    );
  }
}

Todo.propTypes = ShapeTodo.isRequired;
