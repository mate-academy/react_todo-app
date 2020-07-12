import React from 'react';
import PropTypes from 'prop-types';

export class Header extends React.Component {
  state = {
    inputValue: '',
    id: 0,
  }

    onChange = event => (
      this.setState({
        inputValue: event.target.value.replace(/[^\wА-Яа-я\s]|^\s+$/g, ''),
      })
    )

    onEnterDown = (event) => {
      const { addTodo } = this.props;

      if (event.key === 'Enter') {
        const todo = ({
          title: this.state.inputValue,
          id: this.state.id,
          completed: false,
        });

        addTodo(todo);
        this.setState(prevState => ({
          inputValue: '',
          id: prevState.id + 1,
        }));
      }
    }

    render() {
      return (
        <header className="header">
          <h1>todos</h1>

          <input
            onKeyDown={this.onEnterDown}
            onChange={this.onChange}
            value={this.state.inputValue}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
      );
    }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
