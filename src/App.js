import React, { useEffect, useState } from 'react';
import { createUser } from './api/user';
import { getTodos, addTodo } from './api/todos';

import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

function App() {
  const [userId, setUserId] = useState(null);
  const [todos, setTodos] = useState([]);
  // const [user, setUser] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const getId = localStorage.getItem('id');
  // const [allCompleted, setAllCompleted] = useState(false);

  function upDateUserTodos() {
    getTodos(userId)
      .then(todosUpdate => setTodos(todosUpdate));
  }

  function promiseAll(answerFromServer) {
    Promise.all(answerFromServer)
      .then(() => upDateUserTodos());
  }

  function handleInput(e, value) {
    e.preventDefault();

    addTodo(value, userId)
      .then(() => upDateUserTodos());
  }

  function filteredTodos() {
    switch (currentFilter) {
      case 'all': {
        return todos;
      }

      case 'active': {
        return todos.filter(todo => !todo.completed);
      }

      case 'completed': {
        return todos.filter(todo => todo.completed);
      }

      default: {
        return todos;
      }
    }
  }

  useEffect(() => {
    if (getId) {
      setUserId(getId);
    } else {
      createUser()
        .then(({ id }) => {
          setUserId(id);
          localStorage.setItem('id', id);
        });
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // getUser(userId)
      //   .then(user => setUser(user));
      upDateUserTodos();
    }
  }, [userId]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp
          handleInput={handleInput}
        />
      </header>

      <section className="main">
        <TodoList
          todos={filteredTodos()}
          upDateUserTodos={upDateUserTodos}
          promiseAll={promiseAll}
        />
      </section>

      <footer className="footer">
        <TodoFooter
          todos={todos}
          upDateUserTodos={upDateUserTodos}
          getCurrentFilter={filter => setCurrentFilter(filter)}
          currentFilter={currentFilter}
          promiseAll={promiseAll}
        />
      </footer>
    </section>
  );
}

export default App;
