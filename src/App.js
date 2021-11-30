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

    if (inputValue) {
      const time = +new Date();
      const newTodo = {
        id: time,
        title: inputValue,
        completed: false,
      };

      setTodoList(prevState => [...prevState, newTodo]);
      setInputValue('');
    }
  };

  const handleCompletedChange = (todo) => {
    setTodoList(prevState => {
      return prevState.map(item => {
        if (item.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return item;
      });
    });
  };

  const handleRemove = (todo) => {
    setTodoList(prevState => (
      prevState.filter(item => item.id !== todo.id)
    ));
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
        todos={todoList}
        handleRemove={handleRemove}
        handleCompletedChange={handleCompletedChange}
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
