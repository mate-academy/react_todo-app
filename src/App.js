import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [toggleStatus, setToggle] = useState(true);
  const [selectedFilter, setFilter] = useState('All');

  const addTodo = () => {
    if (todoTitle.trim().length > 0) {
      const newTodo = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodoTitle('');
  };

  const unCompleted = todos.filter(todo => !todo.completed);
  const completed = todos.filter(todo => todo.completed);

  const onChangeStatus = (todoId) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));

    if (todos.every(todo => todo.completed)) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const toggleAll = () => {
    setTodos(todos.map(todo => (
      { ...todo, completed: toggleStatus }
    )));
    setToggle(!toggleStatus);
  };

  const FILTERS = {
    All: 'All',
    Active: 'Active',
    Completed: 'Completed',
  };

  const filterTodos = (key) => {
    switch (key) {
      case 'All':
        return todos;

      case 'Active':
        return unCompleted;

      case 'Completed':
        return completed;

      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(FILTERS[selectedFilter]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleAll}
          checked={!unCompleted.length > 0}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={filteredTodos}
          onChangeStatus={onChangeStatus}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {unCompleted.length}
          {' '}
          items left
        </span>

        <TodosFilter
          setFilter={setFilter}
          selectedFilter={selectedFilter}
        />

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
