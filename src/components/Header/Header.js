import React from 'react';
import PropTypes from 'prop-types';
import AddNewTodo from '../AddNewTodo/AddNewTodo';

class Header extends React.PureComponent {
  render() {
    const { onSubmit } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <AddNewTodo placeholder="What needs to be done?" onSubmit={onSubmit} />
      </header>
    )
  }
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Header;
