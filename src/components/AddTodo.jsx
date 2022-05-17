import React, { useState } from 'react';

function AddTodo({ todo, setTodo }) {
  const [form, setForm] = useState('');

  const inputTodo = ({ target: { value } }) => {
    setForm(value);
  };

  const handleSubmit = () => {
    const data = {
      id: +new Date(),
      title: form,
      completed: false,
    };

    const arr = JSON.parse(localStorage.getItem('todo')) || [];

    arr.push(JSON.stringify(data));
    localStorage.setItem('todo', JSON.stringify(arr));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={inputTodo}
        />
      </form>
      {/* <input placeholder="Enter todo" />
      <button
        type="button"
        onClick={saveTodo}
        value={value}
        onChange={e => setValue(e.target.value)}
      /> */}
    </div>
  );
}

export default AddTodo;
