import React from 'react';

import { AddFormShapes } from '../../Shapes/Shapes';

export class AddForm extends React.Component {
  state = {}

  onChange = (event) => {
    const { value } = event.target;

    this.setState({
      taskTitle: value.replace(/^[\s]+|\s{2,}|\s+$/g, ''),
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.taskTitle) {
      this.props.addTodo(this.state.taskTitle);
      event.target.reset();
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onChange}
        />
      </form>
    );
  }
}

AddForm.propTypes = AddFormShapes;
