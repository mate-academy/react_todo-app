import React, { useState, useEffect } from 'react';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';
import { filters } from './filters';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [toogleAll, setToogleAll] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(filters.all);

  const count = todos.reduce(
    (accum, todo) => accum - (todo.completed ? 1 : 0), todos.length,
  );

  const saveData = newTodos => (
    localStorage.setItem('todos', JSON.stringify(newTodos))
  );

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  const createTodo = (event) => {
    event.preventDefault();
    const id = +new Date();
    const completed = false;
    const toggle = true;

    if (!title) {
      return;
    }

    const newTodos = [{
      id, title, completed, toggle,
    }, ...todos];

    setTodos(newTodos);
    setTitle('');
    saveData(newTodos);
  };

  const onToogleAll = () => {
    if (!todos.length) {
      setToogleAll(false);

      return;
    }

    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !toogleAll,
    }));

    setTodos(newTodos);
    setToogleAll(!toogleAll);
  };

  const onClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    if (!newTodos.length) {
      setToogleAll(false);
    }

    setTodos(newTodos);
    saveData(newTodos);
  };

  let todosVisible = [];

  if (visibleTodos === filters.all) {
    todosVisible = todos;
  } else if (visibleTodos === filters.active) {
    todosVisible = todos.filter(todo => !todo.completed);
  } else if (visibleTodos === filters.completed) {
    todosVisible = todos.filter(todo => todo.completed);
  }

  const onVisibleTodos = (str) => {
    setVisibleTodos(str);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoApp
          onCreateTodo={createTodo}
          title={title}
          setTitle={setTitle}
        />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toogleAll}
          onChange={() => onToogleAll()}
        />

        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todosVisible={todosVisible}
          setTodos={setTodos}
          todos={todos}
          saveData={saveData}
          setToogleAll={setToogleAll}
        />
      </section>

      {todos.length ? (
        <footer className="footer">
          <span className="todo-count">
            {`${count} items left`}
          </span>

          <TodosFilter
            onVisibleTodos={onVisibleTodos}
            visibleTodos={visibleTodos}
          />

          {todosVisible.some(todo => todo.completed)
            ? (
              <button
                type="button"
                className="clear-completed"
                onClick={() => onClearCompleted()}
              >
                Clear completed
              </button>
            ) : null
          }
        </footer>
      ) : null
      }
    </section>
  );
}

export default App;
