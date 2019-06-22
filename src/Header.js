import React from "react";
import uuid from "uuid/v1";

const Header = props => {
  return (
    <header className="header">
      <h1>todos</h1>

      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus=""
        onKeyDown={event => {
          if (event.key === "Enter") {
            const newItem = {
              id: uuid(),
              text: event.target.value,
              isCompleted: false
            };
            props.addNewItem(newItem);
            event.target.value = "";
          }
        }}
      />
    </header>
  );
};

export default Header;
