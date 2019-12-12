import React from 'react';
import PropTypes from 'prop-types';

const NewTodo = ({ valueTitle, InputChangeHandler, addTodoHandler }) => (
  <header className="header">
    <form onSubmit={addTodoHandler}>
      <h1>todos</h1>

      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={valueTitle}
        onChange={InputChangeHandler}
      />
    </form>
  </header>

);

NewTodo.propTypes = {
  valueTitle: PropTypes.string.isRequired,
  InputChangeHandler: PropTypes.func.isRequired,
  addTodoHandler: PropTypes.func.isRequired,
};
export default NewTodo;
