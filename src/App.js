import React, { useState, useCallback, useEffect } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { useLocalStorage } from './helpers/useLocasStorage';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [isToggleAll, setIsToggleAll] = useState(true);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useLocalStorage('todos', todos);

  const handleToggle = () => {
    setIsToggleAll(prev => !prev);
    let newTodos = [];

    if (isToggleAll) {
      newTodos = todos.map(todo => ({ ...todo, completed: true }));
    }

    if (!isToggleAll) {
      newTodos = todos.map(todo => ({ ...todo, completed: false }));
    }

    setTodos(newTodos);
  };

  const handleClear = () => {
    setTodos(prevState => prevState.filter(todo => !todo.completed));
    setIsToggleAll(true);
  };

  const putInLocalStorageTodos = useCallback(
    (type) => {
      switch (type) {
        case 'active':
          setFilteredTodos(todos.filter(todo => !todo.completed));
          break;

        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed));
          break;

        case 'all':
        default:
          setFilteredTodos(todos);
      }
    }, [todos],
  );

  useEffect(() => {
    putInLocalStorageTodos(filter);
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
              onChange={handleToggle}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              filterTodos={filteredTodos}
              setFilterTodos={setFilteredTodos}
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
              onClick={handleClear}
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
