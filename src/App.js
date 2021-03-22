import React, { useState, useEffect } from 'react';
import { TodoContext, useLocalStorage } from './TodoContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodo] = useLocalStorage('todos', []);
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  const createTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    if (title === '') {
      return;
    }

    setTodo([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTitle('');
  };

  const contextValue = {
    todos,
    setTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={createTodo}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </form>
        </header>

        {todos.length > 0
          && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={todos.every(todo => todo.completed)}
                onChange={() => {
                  setTodo(todos.map(todoThis => ({
                    ...todoThis,
                    completed: !todos.every(todoThis => todoThis.completed),
                  })));
                }}
              />
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
              <TodoList visibleTodos={visibleTodos} />
            </section>

            <footer className="footer">
              <span className="todo-count">
                {`${todos.filter(todoThis => (
                  !todoThis.completed
                )).length} items left`}
              </span>

              <TodosFilter setVisibleTodos={setVisibleTodos} />

              {todos.some(todoThis => todoThis.completed)
                && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => {
                    setTodo(todos.filter(todoThis => !todoThis.completed));
                  }}
                >
                  Clear completed
                </button>
                )
              }
            </footer>
          </>
          )
        }
      </section>
    </TodoContext.Provider>
  );
}

export default App;
