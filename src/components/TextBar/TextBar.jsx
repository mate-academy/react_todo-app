import React, { useState } from 'react';


export const TextBar = ({ senderTodo }) => {
  const [textBar, setTextBar] = useState('')

  const handleChange = (event) => {
    setTextBar(event.target.value);
  }

  const sendValue = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      senderTodo(textBar);
      setTextBar('');
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form>
        <input
          onKeyDown={sendValue}
          onChange={handleChange}
          value={textBar}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  )
}



        