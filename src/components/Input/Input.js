import React from 'react';
import className from 'classnames';
import { InputTypes } from '../Shapes/Shapes';

export class Input extends React.Component {
  state = {
    title: '',
    isValid: true,
  }

  handleValue = (event) => {
    const titleValue = event.target.value.replace(/\s/, ' ').replace(/^\s/, '');

    this.setState(prevState => ({
      title: titleValue,
      isValid: true,
    }));
  }

  onSubmit = (event) => {
    const onAddTask = this.props.addTask;
    const { title } = this.state;

    if (!title) {
      this.setState({
        isValid: false,
      });

      return;
    }

    if (event.key === 'Enter') {
      onAddTask(title);
      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title, isValid } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <input
          name="task"
          className={className('new-todo ', { 'new-todo--invalid': !isValid })}
          placeholder={isValid && ('What needs to be done?')}
          value={title}
          required
          onKeyPress={this.onSubmit}
          onChange={this.handleValue}
        />
        {!isValid && (
          <span className="error-message">Please, type your task</span>
        )}
      </header>
    );
  }
}

Input.propTypes = InputTypes;
