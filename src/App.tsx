import React, { useState, useEffect } from 'react';
import { AddingForm } from './components/form';
import { TodoList } from './components/TodoList';
import { FILTERS } from './components/constants';
import { Filters } from './components/Filters';
import { InTodo } from './components/Todo';

function App() {
  const [todos, setTodos] = useState<InTodo[]>([]);
  const [filter, setFilter] = useState<string>(FILTERS.all);

  useEffect(() => {
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedTodosCounter = (x: InTodo[]) => (x
    .filter((elem: InTodo) => !elem.completed).length);

  const clearCompleted = () => (
    setTodos((current: InTodo[]) => current.filter(elem => !elem.completed))
  );

  const todosFilter = (todosArray: InTodo[]) => {
    switch (filter) {
      case FILTERS.active:
        return todosArray.filter((elem: InTodo) => elem.completed === false);
      case FILTERS.completed:
        return todosArray.filter((elem: InTodo) => elem.completed === true);
      default:
        return todosArray;
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <AddingForm
          setTodos={setTodos}
          todos={todos}
        />
        <h1>todos App</h1>
      </header>
      {todos.length !== 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every((todo: InTodo) => todo.completed)}
            onChange={({ target }) => {
              setTodos(
                todos.map((todo: InTodo) => {
                  if (todo.completed === target.checked) {
                    return todo;
                  }

                  return { ...todo, completed: !todo.completed };
                }),
              );
            }}
          />
          <label htmlFor="toggle-all"/>

          <ul className="todo-list">
            <TodoList
              todos={todosFilter(todos)}
              setTodos={setTodos}
            />

          </ul>
        </section>
      )}

      {todos.length !== 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {`${completedTodosCounter(todos)} ${todos
                .filter(elem => !elem.completed)
                .length === 1 ? 'item' : 'items'} left`}
            </span>

            <Filters
              FILTERS={FILTERS}
              setFilter={setFilter}
              filter={filter}
            />

            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => clearCompleted()}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
    </section>
  );
}

export default App;
