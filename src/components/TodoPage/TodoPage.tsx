import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';

export const TodoPage: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoQuery, setTodoQuery] = useState('');
  const { pathname } = useLocation();
  const allTodosCompleted = todos.every(todo => todo.completed);

  const addTodo = (userInput: string) => {
    if (userInput) {
      const newTodo: Todo = {
        id: +new Date(),
        title: userInput.trim(),
        completed: false,
      };

      setTodos((currentTodos: Todo[]) => {
        return currentTodos
          ? [newTodo, ...currentTodos]
          : [newTodo];
      });
    }
  };

  const clearCompleted = () => {
    if (todos) {
      setTodos(currentTodos => {
        if (!currentTodos) {
          return currentTodos;
        }

        return currentTodos.filter(todo => todo.completed === false);
      });
    }
  };

  const updateTodo = (id: number, todo: Todo | null) => {
    setTodos(currentTodos => {
      if (!currentTodos) {
        return currentTodos;
      }

      if (todo) {
        return currentTodos.map(currentTodo => {
          if (currentTodo.id === id) {
            return todo;
          }

          return currentTodo;
        });
      }

      return currentTodos.filter(currentTodo => currentTodo.id !== id);
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo(todoQuery);

    setTodoQuery('');
  };

  const toggleAll = () => {
    if (!todos) {
      return;
    }

    setTodos(currentTodos => {
      if (!currentTodos) {
        return currentTodos;
      }

      if (!allTodosCompleted) {
        return currentTodos.map(currentTodo => ({
          ...currentTodo,
          completed: true,
        }
        ));
      }

      return currentTodos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }
      ));
    });
  };

  const visibleTodos = todos.filter(todo => {
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
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoQuery}
            onChange={event => setTodoQuery(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allTodosCompleted}
          onClick={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {visibleTodos && (
          <TodoList
            todos={visibleTodos}
            onUpdate={updateTodo}
          />
        )}

      </section>

      {todos && todos.length > 0 && (
        <footer className="footer">
          <TodoFilter
            todos={todos}
            clearCompleted={clearCompleted}
          />
        </footer>
      )}
    </div>
  );
};
