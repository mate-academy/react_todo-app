/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Status } from './Types/Status';
import { Todo } from './Types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocalStorage = localStorage.getItem('todos');

    try {
      return todosFromLocalStorage
        ? JSON.parse(todosFromLocalStorage)
        : [];
    } catch {
      return [];
    }
  });

  const [sortBy, setSortBy] = useState(Status.All);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const createTodo = (title: string) => {
    if (!title) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const filtredTodos = todos.filter(todo => {
      switch (sortBy) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    setVisibleTodos(filtredTodos);
  }, [sortBy, todos]);

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const setTodoCompleted = (todoId: number) => {
    setTodos(todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      const completedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      return completedTodo;
    }));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const updateTodo = (todoId: number, title: string) => {
    setTodos(todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  const toggleAll = () => {
    setTodos(todos.map(todo => {
      return {
        ...todo,
        completed: false,
      };
    }));
  };

  return (
    <div className="todoapp">
      <Header
        createTodo={createTodo}
      />

      <TodoList
        todos={visibleTodos}
        deleteTodo={deleteTodo}
        setTodoCompleted={setTodoCompleted}
        updateTodo={updateTodo}
        toggleAll={toggleAll}
      />
      <Router>
        <Footer
          todos={todos}
          setSortBy={setSortBy}
          clearCompleted={clearCompleted}
        />
      </Router>
    </div>
  );
};
