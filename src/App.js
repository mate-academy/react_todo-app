import React, { useState } from 'react';
import { useLocation } from 'react-router';
// import { useLocalStorage } from './useLocalStorage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App = () => {
  const [todos, setTodos] = useState([]);

  const setStatus = (todoId) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const changeTitle = (title, todoId) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const completedAll = (check) => {
    setTodos(todos.map((todo) => {
      if (check) {
        return {
          ...todo,
          completed: true,
        };
      }

      return {
        ...todo,
        completed: false,
      };
    }));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const location = useLocation();

  const { pathname } = location;

  const filterTodos = () => {
    switch (pathname) {
      case '/active':
        return activeTodos;
      case '/completed':
        return completedTodos;
      default:
        return todos;
    }
  };

  const clearAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <Header
        setTodos={setTodos}
        todos={todos}
      />
      {todos
        && (
        <>
          <TodoList
            todos={todos}
            filterTodos={filterTodos}
            setStatus={setStatus}
            changeTitle={changeTitle}
            removeTodo={removeTodo}
            completedAll={completedAll}
          />
          <Footer
            todos={todos}
            activeTodos={activeTodos}
            clearAllCompleted={clearAllCompleted}
          />
        </>
        )

      }
    </section>
  );
};
