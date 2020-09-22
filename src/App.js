import React, { useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const [currentTitleValue, setCurrentTitleValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        todo,
        id: Date.now(),
        todos: currentTitleValue,
        completed: false,
      },
    ]);
    setCurrentTitleValue('');
  }

  useEffect(() => {
    setVisibleTodos([
      todos,
    ]);
  }, [todos]);

  function changeProcessTodo(todoId) {
    if (typeof todoId === 'number') {
      setTodos(todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }));
    } else {
      setTodos(todos.map(todo => (
        todos.every(item => (item.completed))
          ? ({
            ...todo,
            completed: false,
          })
          : ({
            ...todo,
            completed: true,
          })
      )));
    }
  }

  useEffect(() => {
    switch (typeFilter) {
      case 'All':
        setVisibleTodos(todos);
        break;
      case 'Active':
        setVisibleTodos(todos.filter(item => !item.completed));
        break;
      case 'Completed':
        setVisibleTodos(todos.filter(item => item.completed));
        break;
      case 'Clear completed':
        setVisibleTodos(visibleTodos.filter(item => item.completed));
        setTodos(visibleTodos);
        break;
      default:
        break;
    }
  }, [typeFilter, todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={currentTitleValue}
            onChange={({ target }) => setCurrentTitleValue(target.value)}
            onKeyDown={(event) => {
              (event.key === 'Enter') && (addTodo(currentTitleValue));
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={() => changeProcessTodo()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          changeProcessTodo={changeProcessTodo}
        />
      </section>
      {(todos.length > 0)
        && (
          <footer className="footer">
            <Filters
              todos={visibleTodos}
              setTypeFilter={setTypeFilter}
            />
          </footer>
        )
      }
    </section>
  );
}

export default App;
