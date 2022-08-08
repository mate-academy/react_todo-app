import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleStorage } from '../customHooks/useLocaleStorage';
import { Todo } from '../styles/Todo';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';

export const TodoApp: FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[] | null>('todos', null);
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const everyCompletedTodos = todos?.every(todo => todo.completed);

  const updateTodoHandler = (id: number, todo: Todo | null) => {
    setTodos(prevTodos => {
      if (!prevTodos) {
        return prevTodos;
      }

      if (todo) {
        return prevTodos.map(prevTodo => {
          if (prevTodo.id === id) {
            return todo;
          }

          return prevTodo;
        });
      }

      return prevTodos.filter(prevTodo => prevTodo.id !== id);
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    setTodos(prevTodos => {
      window.console.log('add');
      const newTodo = {
        id: +new Date(),
        title: normalizedQuery,
        completed: false,
      };

      return prevTodos
        ? [...prevTodos, newTodo]
        : [newTodo];
    });

    setQuery('');
  };

  const handlerOfToggleAll = () => {
    if (!todos) {
      return;
    }

    setTodos(prev => {
      if (!prev) {
        return prev;
      }

      if (!everyCompletedTodos) {
        return prev.map(prevTodo => ({ ...prevTodo, completed: true }));
      }

      return prev.map(todo => ({ ...todo, completed: !todo.completed }));
    });
  };

  const deleteCompletedTodos = () => {
    if (todos) {
      setTodos(prev => {
        if (!prev) {
          return prev;
        }

        return prev.filter(todo => todo.completed === false);
      });
    }
  };

  const visibleTodos = todos?.filter(todo => {
    switch (pathname) {
      case '/active':
        return !todo.completed;
      case '/completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>
          todos
        </h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={everyCompletedTodos}
          onClick={handlerOfToggleAll}
        />

        <label htmlFor="toggle-all">
          Mark all as complete
        </label>

        {visibleTodos && (
          <TodoList
            todos={visibleTodos}
            onUpdate={updateTodoHandler}
          />
        )}
      </section>

      {todos && todos.length > 0 && (
        <footer className="footer">
          <TodoFilter
            todos={todos}
            deleteCompleted={deleteCompletedTodos}
          />
        </footer>
      )}
    </div>
  );
};
