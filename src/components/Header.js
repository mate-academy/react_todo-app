import React from "react";

const Header = (props) => {
  const {passIdBack, addNewItem} = props;
  const submit = (event) => {
    let value = event.target.toDoItem.value;
    const newItem = {
      id: passIdBack,
      text: value,
      isCompleted: false,
    };
    if(value) {
      addNewItem(newItem);
      value = '';
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={submit}
      >
        <input
          autoFocus="true"
          className="new-todo"
          placeholder="What needs to be done?"
          name="toDoItem"
        />
      </form>
    </header>
  );
};

export default Header;
