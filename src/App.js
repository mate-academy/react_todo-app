import React, { useState, useCallback, useEffect } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { useLocalStorage } from './helpers/useLocasStorage';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [toggleAll, setToggleAll] = useState(true);
  const [filter, setFilter] = useState('all');
  const [filterTodos, setFilterTodos] = useLocalStorage('todos', todos);

  const toggleHandler = () => {
    setToggleAll(prev => !prev);
    let newTodos = [];

    if (toggleAll) {
      newTodos = todos.map(todo => (
        {
          ...todo,
          completed: true,
        }
      ));
    }

    if (!toggleAll) {
      newTodos = todos.map(todo => (
        {
          ...todo,
          completed: false,
        }
      ));
    }

    setTodos(newTodos);
  };

  const clearHandler = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    setToggleAll(true);
  };

  const localStorageTodos = useCallback(
    (type) => {
      switch (type) {
        case 'active':
          setFilterTodos(todos.filter(todo => !todo.completed));
          break;

        case 'completed':
          setFilterTodos(todos.filter(todo => todo.completed));
          break;

        case 'all':
        default:
          setFilterTodos(todos);
      }
    }, [todos],
  );

  useEffect(() => {
    localStorageTodos(filter);
  }, [todos, filter]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form
          setTodos={setTodos}
          todos={todos}
        />
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleHandler}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              filterTodos={filterTodos}
              setFilterTodos={setFilterTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <TodoFilter
              todos={todos}
              setFilter={setFilter}
              filter={filter}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={() => clearHandler()}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default App;
