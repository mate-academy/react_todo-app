import React, { useEffect, useState } from 'react';
import { TodoApp } from './Component/Header/TodoApp';
import { TodoList } from './Component/Main/TodoList';
import { TodoFilter } from './Component/Footer/TodosFilter';
// import { useLocalStorage } from './Component/useLocalState';
import * as api from './Component/API/api';
import * as apiUsers from './Component/API/users';
import * as apiTodos from './Component/API/todos';
// import * as apiTodos from './Component/API/todos';
import './styles/filters.css';
import './styles/index.css';
import './styles/todo-list.css';

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  // const [todos, setTodos] = useLocalStorage('todos', []);
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   if (localStorage.todos) {
  //     setTodos(JSON.parse(localStorage.getItem('todos')));
  //   } else { apiTodos.getTodos()
  //   .then(setTodos);
  // }}, []);
  const loadTodosFromServer = async(userID) => {
    const result = await apiTodos.getTodos(userID);

    setTodos(result);
  };

  useEffect(() => {
    loadTodosFromServer(userId);
  }, [userId]);
  const addTodo = async(newTodo) => {
    await apiTodos.addTodo(newTodo);

    await loadTodosFromServer(userId);
  };

  useEffect(() => {
    setItems([...todos]);
  }, [todos]);

  const onFilter = (comand) => {
    setFilter(comand);
    switch (comand) {
      case 'active':

        return setItems([...todos.filter(todo => todo.completed === false)]);

      case 'completed':

        return setItems([...todos.filter(todo => todo.completed === true)]);

      default:

        return setItems([...todos]);
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const deleteTodo = (removeTodoID) => {
    apiTodos.removeTodo(removeTodoID);
    loadTodosFromServer(userId);
  };

  const completeTodo = (isCopleted) => {
    setTodos(todos.map((todo) => {
      if (todo.id === isCopleted) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const completeAllTodo = (comandAll) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: comandAll,
    })));
  };

  const onAddNewTitle = (newTitle) => {
    setTodos(todos.map((todo) => {
      if (todo.id === newTitle.id) {
        return {
          ...todo,
          title: newTitle.title,
        };
      }

      return todo;
    }));
  };

  useEffect(() => {
    apiUsers.getUserId(api.userSetUpName)
      .then(result => setUserId(result.id));
  }, []);

  useEffect(() => {
    apiUsers.getUserId(api.userSetUpName)
      .then(result => setUserName(result.name));
  }, []);

  return (
    <section className="todoapp">
      <header className="header">

        {(!userName) && (
          <div className="conteiner-button">
            <button
              type="button"
              className="button-new"
              onClick={() => {
                apiUsers.addUser();
              }}
            >
              1. ADD USER
            </button>

            <button
              type="button"
              className="button-new"
              onClick={apiUsers.getUserId}
            >
              2. GET USERID
            </button>

            <button
              type="button"
              className="button-new"
              onClick={() => {
                apiUsers.removeUser(userId);
              }}
            >
              3. removeUSER
            </button>
          </div>
        )}

        {(userName) && (
          <span
            className="user-name"
          >
            {`name: ${userName}`}
          </span>
        )}

        <h1>todos</h1>

        <TodoApp
          onAdd={addTodo}
          todos={todos}
          userId={userId}
        />
      </header>

      <section className="main">
        <TodoList
          items={items}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          completeAllTodo={completeAllTodo}
          showFotter={todos.length > 0}
          onAddNewTitle={onAddNewTitle}
        />
      </section>

      <TodoFilter
        todos={todos}
        filter={filter}
        onFilter={onFilter}
        clearCompleted={clearCompleted}
        showFotter={todos.length > 0}
      />

    </section>
  );
}

export default App;
