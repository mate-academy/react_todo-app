import React from 'react';

const Input = ({ addTodoItem }) => {
  const submit = (e) => {
    addTodoItem(e.target.toDoItem.value);
    e.target.reset();
  };

  {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={submit}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            name="toDoItem"
            autoFocus
          />
        </form>
      </header>
    );
  }
};
export default Input;
