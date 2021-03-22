import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoTitle.trim().length > 0) {
      const todo = {
        title: todoTitle,
        id: +new Date(),
        completed: null,
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

  const setAllTodosCompleted = () => {
    setTodos(prevState => prevState.map(todo => (
      { ...todo, completed: !todo.completed }
    )));
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

  return (
    <section className="todoapp">
      <Form
        handleSubmit={handleSubmit}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
      />

      <TodoList
        todos={filterTodos}
        setStatus={setStatus}
        destroyTodo={destroyTodo}
        activeTodos={activeTodos}
        setAllTodosCompleted={setAllTodosCompleted}
        setTitleEditing={setTitleEditing}
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
