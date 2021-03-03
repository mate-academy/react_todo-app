import React, { useState }  from 'react';

export const TodoInput = ({ addTodo }) => {

  const [inputValue, setInputValue] = useState('');

  const createTodo = (event) => {
    event.preventDefault();

    if(inputValue.trim()) {

      const newTodo = {
        title: inputValue,
        id: new Date().toLocaleTimeString(),
        completed: false,
        isBeingEdited: false,
      };

      console.log('Adding todo...', newTodo)
      addTodo(newTodo);
    }

    setInputValue('');
  };

  const inputChange = (event) => {
    if(event.target.value.trim()) {
      setInputValue(event.target.value);
    }
  };


  return (

    <form onSubmit={createTodo}>
    <input
      type="text"
      value={inputValue}
      onChange={inputChange}
      className="new-todo"
      placeholder="What needs to be done?"
    />
  </form>
  )
}