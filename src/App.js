import React, { useEffect, useState, useCallback } from 'react';
import { NewTodo } from './components/newTodo';
import { TodoList } from './components/todoList';
import { FilterTodos } from './components/filterTodos';
import { useLocalStorage } from './components/localStorage';

function App() {
  const [todos, setTodos] = useLocalStorage('todosArr');
  const [uncomplete, setUncomplete] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [filter, setFilter] = useState('All');

  const filterChange = (event) => {
    setFilter(event.target.name);
  };

  const changeToggle = (id, completed) => {
    const index = todos.findIndex(todo => todo.id === id);
    const updatedTodos = [...todos];

    updatedTodos[index].completed = completed;
    setTodos(updatedTodos);
  };

  const addTodo = useCallback((value) => {
    if (!value) {
      return;
    }

    const todo = {
      id: +new Date(),
      title: value,
      completed: false,
    };

    setTodos([...todos, todo]);
  }, [todos]);

  const destroyTodo = useCallback((event) => {
    const { name } = event.target;
    const index = todos.findIndex(todo => todo.id === +name);
    const updatedTodos = [...todos];

    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);
  }, [todos]);

  const clearCompleted = useCallback(() => {
    const updatedTodos = [...todos].filter(todo => !todo.completed);

    setTodos(updatedTodos);
    setToggleAll(false);
  }, [todos]);

  const changeTitle = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  useEffect(() => {
    setUncomplete(todos.filter(todo => !todo.completed));
  }, [todos, toggleAll]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo addTodo={addTodo} />
      </header>

      {(todos.length !== 0) && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={uncomplete.length === 0}
              onChange={() => {
                setToggleAll(!toggleAll);
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              <TodoList
                todos={todos}
                toggleAll={toggleAll}
                changeToggle={changeToggle}
                destroyTodo={destroyTodo}
                filter={filter}
                changeTitle={changeTitle}
              />
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              {`${uncomplete.length} items left`}
            </span>

            <FilterTodos
              filterChange={filterChange}
              filter={filter}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default App;
