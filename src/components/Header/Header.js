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

    this.setState((state) => {
      if (state.title.trim() === '') {
        return '';
      }

      addTodo({
        id: +new Date(),
        title: state.title,
        completed: false,
        isEditable: false,
      });

      return {
        title: '',
      };
    });
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
