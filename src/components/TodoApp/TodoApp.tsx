/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { TodoForm } from '../TodoForm';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const location = useLocation();
  const filterBy = location.pathname;

  const addTodo = (todo: Todo) => {
    setTodos((prev: Todo[]) => [...prev, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev: Todo[]) => {
      return prev.filter(todo => {
        return todo.id !== id;
      });
    });
  };

  const updateTodoTitle = (id: number, title: string) => {
    setTodos((prev: Todo[]) => {
      return prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, title };
        }

        return todo;
      });
    });
  };

  const updateTodoStatus = (id: number, isCompleted: boolean) => {
    setTodos((prev: Todo[]) => {
      return prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted };
        }

        return todo;
      });
    });
  };

  const visibleTodos = todos.filter((todo: Todo) => {
    switch (filterBy) {
      case '/active': {
        return !todo.isCompleted;
      }

      case '/': {
        return true;
      }

      case '/completed': {
        return todo.isCompleted;
      }

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm onAdd={addTodo} />
      </header>
      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              checked={todos.every((t: Todo) => t.isCompleted)}
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={() => {
                todos.map((todo: Todo) => {
                  const checked = !todo.isCompleted;

                  updateTodoStatus(todo.id, checked);

                  return todo;
                });
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

          </>
        )}
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodo}
          onUpdateTitle={updateTodoTitle}
          onUpdateStatus={updateTodoStatus}
        />
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todos.filter((todo: Todo) => !todo.isCompleted).length}
            {' '}
            items left
          </span>

          <TodoFilter />

          {todos.filter((t: Todo) => t.isCompleted).length >= 1 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                setTodos((prev: Todo[]) => {
                  return prev.filter(item => !item.isCompleted);
                });
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
