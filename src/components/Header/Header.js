import React, { Component } from 'react';
import { headerType } from '../../typedefs/headerType';
import './Header.scss';

export class Header extends Component {
  state = {
    title: '',
  };

  setTitle = ({ target }) => {
    const title = target.value.slice(0, 30);

    this.setState({
      title,
    });
  };

  validateForm = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const trimStr = this.state.title.trim();

    if (trimStr === '') {
      return;
    }

    addTodo({
      id: +new Date(),
      title: trimStr,
      completed: false,
      isEditable: false,
    });

    this.setState({ title: '' });
  };

  render = () => {
    const { title } = this.state;

    return (
      <header className="header">

        <form onSubmit={this.validateForm}>
          <input
            className="new-todo"
            placeholder="Click to add task"
            type="text"
            onChange={this.setTitle}
            onBlur={this.validateForm}
            value={title}
          />
        </form>
      </header>
    );
  };
}

Header.propTypes = headerType.isRequired;
