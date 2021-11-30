import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const todos = [
  {
    id: 1,
    title: 'Cross from lake to forest!',
    completed: false,
  },
  {
    id: 2,
    title: 'Cross from city to vilage!',
    completed: false,
  },
  {
    id: 3,
    title: 'Cross from sea to hotel!',
    completed: false,
  },
];

function App() {
  const [todoList, setTodoList] = useState(todos);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = new Date().toDateString();
    const newTodo = {
      id: time,
      title: event.target.value,
      completed: false,
    };

    setTodoList((prevState) => {
      return {
        ...prevState,
        newTodo,
      };
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <TodoList
        todosFromServer={todoList}
      />

      <footer className="footer">
        <span className="todo-count">
          3 items left
        </span>

        <TodosFilter />

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
