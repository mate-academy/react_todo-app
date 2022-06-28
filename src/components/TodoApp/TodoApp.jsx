import React, { useContext } from 'react';
import '../../styles/index.css';
import '../../styles/todo-list.css';

import { TodoContext } from '../../TodoContext';

const TodoApp = () => {
  const { setTodos, todos, setInputText, inputText } = useContext(TodoContext);
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: new Date().toLocaleTimeString(),
        title: inputText,
        complete: false,
      },
    ]);

    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        value={inputText}
        placeholder="What needs to be done?"
        onChange={handleInputChange}
      />
    </form>
  );
};

export default TodoApp;
