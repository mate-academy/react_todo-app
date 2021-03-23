import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from "use-local-storage";

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoTitle.trim().length > 0) {
      const todo = {
        title: todoTitle,
        id: +new Date(),
        completed: false,
      };

      setTodos([todo, ...todos]);
    }

    setTodoTitle('');
  };

  const setStatus = (todoId) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const destroyTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
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

  const clearCompletedTodos = () => {
    setTodos(activeTodos);
  };

  const setTitleEditing = (todoId, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };


  const status = todos.every(todo => todo.completed === true);

  const changeAllTodosStatus = (status) => {
    setTodos(prevState => prevState.map(todo => (
      { ...todo, completed: status }
    )))
  };

  return (
    <section className="todoapp">
      <Form
        handleSubmit={handleSubmit}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
      />

      <TodoList
        todos={filterTodos}
        setTodos={setTodos}
        setStatus={setStatus}
        destroyTodo={destroyTodo}
        setTitleEditing={setTitleEditing}
        status={status}
        changeAllTodosStatus={changeAllTodosStatus}
      />

      {todos.length > 0
        && (
          <Footer
            todos={todos}
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            clearCompletedTodos={clearCompletedTodos}
          />
        )
      }
    </section>
  );
}

export default App;
