import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [toggleStatus, setToggle] = useState(true);
  const [selectedFilter, setFilter] = useState('All');

  const getCountNotCompleted = () => (
    todos.filter(todo => !todo.completed).length
  );

  const countNotCompleted = getCountNotCompleted();

  const toggleStatusAll = () => {
    setTodos(todos.map(todo => (
      { ...todo, completed: toggleStatus }
    )));
    setToggle(!toggleStatus);
  };

  const toggleStatusItem = (itemId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
  };

  const filterTodos = () => {
    const FILTERS = {
      All: todos,
      Active: todos.filter(todo => !todo.completed),
      Completed: todos.filter(todo => todo.completed),
    };

    return FILTERS[selectedFilter];
  };

  const filteredTodos = filterTodos();

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo setTodos={setTodos} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleStatusAll}
          value={toggleStatus}
          checked={!countNotCompleted > 0}
        />
        {todos.length > 0
          && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )
        }
        <TodoList
          todos={filteredTodos}
          toggleStatusItem={toggleStatusItem}
        />
      </section>

      {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {`${countNotCompleted} `}
              item left
            </span>

            <TodosFilter
              setFilter={setFilter}
              selectedFilter={selectedFilter}
            />

            <button type="button" className="clear-completed">
              Clear completed
            </button>
          </footer>
        )}
    </section>
  );
}

export default App;
