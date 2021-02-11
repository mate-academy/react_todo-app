import React, { useEffect, useState } from 'react';
import { TodoApp } from './Component/Header/TodoApp';
import { TodoList } from './Component/Main/TodoList';
import { TodoFilter } from './Component/Footer/TodosFilter';
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
  const [todos, setTodos] = useState([]);

  // function useLocalStorage(key, initialValue) {
  //   const [storedValues, setStoredValues] = useState(() => {
  //     try {
  //       const item = window.localStorage.getItem(key);

  //       return item ? JSON.parse(item) : initialValue;
  //     } catch (error) {
  //       console.log(error);

  //       return initialValue;
  //     }
  //   });

  //   const setValue = (value) => {
  //     try {
  //       const valueToStore
  //         = value instanceof Function ? value(storedValues) : value;

  //       setStoredValues(valueToStore);

  //       window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   return [storedValues, setValue];
  // }

  const loadTodosFromServer = (userID) => {
    apiTodos.getTodos(userID).then((todosFromServer) => {
      setTodos([...todosFromServer]);
    });
  };

  useEffect(() => {
    loadTodosFromServer(userId);
  }, [userId]);

  // eslint-disable-next-line no-shadow
  const addTodo = (userId, newTodo) => {
    apiTodos.addTodo(userId, newTodo);
    loadTodosFromServer(userId);
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
