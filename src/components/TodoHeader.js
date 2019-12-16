import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodoHeader extends Component {
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
        <h1>todos</h1>

        <form onSubmit={this.validateForm}>
          <input
            className={cn('new-todo')}
            placeholder="What needs to be done?"
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

TodoHeader.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoHeader;
