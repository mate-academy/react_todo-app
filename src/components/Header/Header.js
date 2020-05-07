import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class Header extends Component {
  state = {
    title: '',
  };

  setTitle = ({ target }) => {
    const title = target.value.slice(0, 37);

    this.setState({
      title,
    });
  };

  validateForm = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.title.trim() === '') {
        return '';
      }

      this.props.addTodo({
        id: +new Date(),
        title: prevState.title,
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
      <header className={cn('header')}>

        <form onSubmit={this.validateForm}>
          <input
            className={cn('new-todo')}
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

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
