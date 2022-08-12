/* eslint-disable max-len */
import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosLocalStorage = localStorage.getItem('todos');

    try {
      return todosLocalStorage ? JSON.parse(todosLocalStorage) : [];
    } catch {
      return [];
    }
  });

  const [visibleTodos, setvisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    switch (pathname) {
      case Status.ACTIVE:
        setvisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case Status.COMPLETED:
        setvisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setvisibleTodos(todos);
        break;
    }
  }, [todos, pathname]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newQuery = query.trim();

    if (!newQuery) {
      return;
    }

    const todoId = +new Date();

    const newTodo = {
      id: todoId,
      title: newQuery,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const addTodos = todos.map(newTodos => {
      if (todos.every(todo => todo.completed)) {
        return {
          ...newTodos,
          completed: false,
        };
      }

      return {
        ...newTodos,
        completed: true,
      };
    });

    setTodos(addTodos);
  };

  const toggleCompleted = (todoId: number) => {
    const todoComplet = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(todoComplet);
  };

  return (
    <>
      <div className="todoapp">
        <Header />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </form>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            todos={visibleTodos}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
    </>
  );
};
