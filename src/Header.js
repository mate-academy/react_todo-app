import React from "react";
import uuid from "uuid/v1";

const Header = props => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={event => {
          const newItem = {
            id: uuid(),
            text: event.target.toDoItem.value,
            isCompleted: false
          };
          props.addNewItem(newItem);
          event.target.toDoItem.value = "";
        }}
      >
        <input
          autofocus="true"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
          name="toDoItem"
        />
      </form>
    </header>
  );
};

export default Header;
