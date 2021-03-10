import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NewTodo } from './components/NewTodo';
import { FilterTodos } from './components/FilterTodos';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  const addTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const filteredTodos = useMemo(() => {
    let tempTodos = [...todos];

    switch (pathname) {
      case '/active':
        tempTodos = todos.filter(todo => !todo.completed);
        break;
      case '/completed':
        tempTodos = todos.filter(todo => todo.completed);
        break;
      default:
        tempTodos = todos;
        break;
    }

    return tempTodos;
  }, [pathname, todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo addTodo={addTodo} />
      </header>

      <section className="main">
        <TodoList todos={filteredTodos} setTodos={setTodos} />
      </section>

      {!!todos.length && (
      <footer className="footer">
        <FilterTodos todos={todos} setTodos={setTodos} />
      </footer>
      )}
    </section>
  );
}

export default App;
