import React, { useState } from 'react';
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [allStatus, setAllStatus] = useState(false);

  const addNewTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const toggleCompletedStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    }));
  };

  const removeItem = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  const toggleAll = () => {
    if (allStatus) {
      setTodos(todos.map(todo => ({
        ...todo,
        isCompleted: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        isCompleted: true,
      })));
    }

    setAllStatus(!allStatus);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <InputField addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          removeItem={removeItem}
          toggleCompletedStatus={toggleCompletedStatus}
          todos={todos}
        />
      </section>

      <Footer clearCompleted={clearCompleted} todos={todos} />
    </section>
  );
}

export default App;
