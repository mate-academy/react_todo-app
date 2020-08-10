import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Context } from './context';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [todoTitle, setTodoTitle] = useState('');

  function addTodo(event) {
    if (event.key === 'Enter' && todoTitle !== '') {
      setTodos([
        ...todos,
        {
          text: todoTitle,
          id: Date.now(),
          isDone: false,
        },
      ]);

      setTodoTitle('');
    }
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) => {
      const result = { ...todo };

      if (result.id === id) {
        result.isDone = !todo.isDone;
      }

      return result;
    }));
  }

  function checkAll() {
    if (todos.every(todo => todo.isDone === true)) {
      setTodos(todos.map(todo => ({
        ...todo,
        isDone: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        isDone: true,
      })));
    }
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => todo.isDone === false));
  }

  function choseAction(action) {
    setFilter(action);
  }

  return (
    <Context.Provider value={{
      addTodo,
      setTodoTitle,
      toggleTodo,
      checkAll,
      removeTodo,
      clearCompleted,
      choseAction,
      todos,
      todoTitle,
      filter,
    }}
    >
      <section className="todoapp">
        <Header />
        <Main />
        <Footer />
      </section>
    </Context.Provider>
  );
}

export default App;
