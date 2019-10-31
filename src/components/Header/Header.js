import React from 'react';
import AddNewTodo from '../AddNewTodo/AddNewTodo';

class Header extends React.Component {

  render () {
    const { onSubmit } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <AddNewTodo placeholder="What needs to be done?" onSubmit={onSubmit} />
      </header>
    )
  }
}

export default Header;
