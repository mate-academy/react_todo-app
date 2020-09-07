import React, { useState } from 'react';
import { Todo } from './components/Todo/Todo';

const App = () => {
  const [todosCounter, setTodosCounter] = useState(1);
  const [allTodos, todosSetter] = useState([]);
  const [filterChosen, setFilter] = useState('All');

  let visibleTodos;

  if (filterChosen === 'All') {
    visibleTodos = allTodos.filter(() => true);
  } else if (filterChosen === 'Completed') {
    visibleTodos = allTodos.filter(current => current.completed);
  } else if (filterChosen === 'Active') {
    visibleTodos = allTodos.filter(current => !current.completed);
  }

  const addTodo = (event) => {
    const input = event.target;

    if (!input.value) {
      return;
    }

    todosSetter([...allTodos, {
      title: input.value,
      completed: false,
      id: todosCounter,
    }]);

    setTodosCounter(todosCounter + 1);
    input.value = '';
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              addTodo(event);
            }
          }}
          onBlur={addTodo}
        />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={allTodos.every(todo => todo.completed)}
          onChange={() => {
            const statevalue = allTodos.some(current => !current.completed);

            todosSetter(
              allTodos.map((current) => {
                const todo = current;

                todo.completed = statevalue;

                return todo;
              }),
            );
          }}
        />

        {allTodos.length > 0
        && <label htmlFor="toggle-all">Mark all as complete</label>
        }

        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              allTodos={allTodos}
              todosSetter={todosSetter}
            />
          ))}
        </ul>
      </section>

      {allTodos.length > 0
      && (
        <footer className="footer">
          <span className="todo-count">
            {`${allTodos.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <button
                type="button"
                className={filterChosen === 'All' ? 'selected' : null}
                onClick={() => setFilter('All')}
              >
                All
              </button>
            </li>

            <li>
              <button
                type="button"
                className={filterChosen === 'Active' ? 'selected' : null}
                onClick={() => setFilter('Active')}
              >
                Active
              </button>
            </li>

            <li>
              <button
                type="button"
                className={filterChosen === 'Completed' ? 'selected' : null}
                onClick={() => setFilter('Completed')}
              >
                Completed
              </button>
            </li>
          </ul>

          {allTodos.some(todo => todo.completed)
          && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                todosSetter(
                  allTodos.filter(todo => !todo.completed),
                );
              }}
            >
              Clear completed
            </button>
          )
          }
        </footer>
      )
      }
    </section>
  );
};

export default App;
