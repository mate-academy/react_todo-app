import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SelectAll } from '../SelectAll';
import './Header.css';

export class Header extends PureComponent {
  state = {
    inputValue: '',
  };

handleChange = (event) => {
  const { value } = event.target;

  this.setState({
    inputValue: value,
  });
};

handleBlur = () => {
  this.props.setNewTodo(this.state.inputValue);

  this.setState({
    inputValue: '',
  });
};

render() {
  const { inputValue } = this.state;
  const { selectAll, isSelectAll } = this.props;

  return (
    <header className="header">
      <h1>todos</h1>
      <form action="#" onSubmit={this.handleBlur}>
        <input
          value={inputValue}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
        <SelectAll selectAll={selectAll} isSelectAll={isSelectAll} />
      </form>
    </header>
  );
}
}

Header.propTypes = {
  setNewTodo: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  isSelectAll: PropTypes.bool.isRequired,
};
