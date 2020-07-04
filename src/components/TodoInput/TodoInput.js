import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoInputShape } from '../../Shapes';

export class TodoInput extends React.Component {
  state = {
    title: '',
    error: false,
  }

  setTitle = (value) => {
    this.setState({
      title: value.replace(/\s/g, ' ').replace(/^\s/, ''),
      error: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    if (!title) {
      this.setState({
        error: true,
      });

      return false;
    }

    addTodo({
      title,
      id: uuidv4(),
      completed: false,
    });

    this.setState({
      title: '',
      error: false,
    });

    return true;
  }

  render() {
    const { title, error } = this.state;

    return (
      <>
        {
          error && (
            <div className="form-error">
              Please add something
            </div>
          )
        }
        <form className="form" onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            name="todo"
            maxLength="100"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => this.setTitle(event.target.value)}
          />
        </form>
      </>
    );
  }
}

TodoInput.propTypes = TodoInputShape.isRequired;
