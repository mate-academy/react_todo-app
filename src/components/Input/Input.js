import React from 'react';
import { InputTypes } from '../Shapes/Shapes';

export class Input extends React.Component {
  state = {
    title: '',
  }

  handleValue = (event) => {
    const titleValue = event.target.value;

    this.setState(prevState => ({
      title: titleValue,
    }));
  }

  onSubmit = (event) => {
    if (event.key === 'Enter') {
      this.props.addTask(this.state.title);
      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;
    // console.log(titleValue);

    return (
      <input
        name="task"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onKeyPress={this.onSubmit}
        onChange={this.handleValue}
      />
    );
  }
}

Input.propTypes = InputTypes;
