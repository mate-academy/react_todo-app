import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    values: {
      id: 1,
      title: '',
      completed: false,
    },
    errors: {
      title: false,
    },
  };

  resetForm = () => {
    this.setState(prev => ({
      values: {
        ...prev.values,
        title: '',
        id: prev.values.id + 1,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.values.title.trim() === '') {
      this.setState(prev => ({
        errors: {
          title: !prev.title,
        },
      }));

      return;
    }

    if (this.state.errors.title === false) {
      this.props.handleAddTodo(this.state.values);
      this.resetForm();
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className={cn('new-todo', {
              error: errors.title,
            })}
            placeholder="What needs to be done?"
            value={this.state.values.title}
            onChange={({ target }) => {
              this.setState(prev => ({
                values: {
                  ...prev.values,
                  title: target.value,
                },
                errors: {
                  title: false,
                },
              }));
            }}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};

export default Header;
