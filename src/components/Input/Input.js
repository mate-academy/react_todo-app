import React from 'react';
import className from 'classnames';
import { uuid } from 'uuidv4';
import { InputTypes } from './InputShape';

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
    const { addTask } = this.props;
    const { title } = this.state;

    if (!title) {
      this.setState({
        isValid: false,
      });

      return;
    }

    if (event.key === 'Enter') {
      const newTask = {
        title,
        id: uuid(),
        completed: false,
      };

      addTask(newTask);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title, isValid } = this.state;

    const inputClassNames = className(
      'new-todo ',
      { 'new-todo--invalid': !isValid },
    );

    return (
      <header className="header">
        <h1>todos</h1>
        <input
          name="task"
          className={inputClassNames}
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
