import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { TodoForm } from './components/TodoFrom';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const updateTodos = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  // console.log(todos);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoForm
          updateTodos={updateTodos}
        />
      </header>

      <TodoList
        todos={todos}
        setTodos={setTodos}
      />

      {!!todos.length && (
        <Footer
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </section>
  );
}

export default App;
