import React, { useState } from 'react';
import { NewTodo } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key))
      || initValue,
  );

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSubmit = (todoText) => {
    setTodos([
      ...todos,
      { completed: false, id: +new Date(), title: todoText },
    ]);
  };

  const handleToggleAll = () => {
    if (isAllCompleted) {
      setTodos(todos.map(todo => (
        { ...todo, completed: false }
      )));
      setIsAllCompleted(false);
    } else {
      setTodos(todos.map(todo => (
        { ...todo, completed: true }
      )));
      setIsAllCompleted(true);
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map(
      todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const handleDelete = (title) => {
    setTodos(todos.filter(todo => todo.title !== title));
  };

  const handleClear = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleShowAll = () => {
    setIsFiltered(false);
  };

  const handleShowCompleted = () => {
    setIsFiltered(true);
    setFilteredTodos(todos.filter(todo => todo.completed));
  };

  const handleShowActive = () => {
    setIsFiltered(true);
    setFilteredTodos(todos.filter(todo => !todo.completed));
  };

  const handleChangeTitle = (changedTodo) => {
    setTodos(todos.map((todo) => {
      if (todo.id === changedTodo.id) {
        return changedTodo;
      }

      return todo;
    }));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodo onSubmit={handleSubmit} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={isFiltered
            ? filteredTodos
            : todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onSubmit={handleChangeTitle}
        />

      </section>

      {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {[...todos].filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <TodosFilter
              handleShowAll={handleShowAll}
              handleShowCompleted={handleShowCompleted}
              handleShowActive={handleShowActive}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={handleClear}
            >
              Clear completed
            </button>
          </footer>
        )}
    </section>
  );
}

export default App;
