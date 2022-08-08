/* eslint-disable no-console */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../CustomHook/LocalStorage';
import { Todo } from '../types/todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

enum SortBy {
  Active = '/active',
  Completed = '/completed',
}

export const TodoApp: React.FC = () => {
  const [todoQuery, setTodoQuery] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[] | []>('todos', []);
  const { pathname } = useLocation();
  const completedTodos = todos.filter(todo => todo.completed === true);

  const deleteTodos = (value: number | boolean) => {
    if (todos) {
      const filteredTodos = todos.filter(
        currentTodo => (typeof value === 'number'
          ? currentTodo.id !== value
          : currentTodo.completed !== value),
      );

      setTodos(filteredTodos);
    }
  };

  const updateTodos = (updatedTodo: Todo) => {
    if (todos) {
      setTodos(
        todos.map(currentTodo => {
          if (currentTodo.id !== updatedTodo.id) {
            return currentTodo;
          }

          return updatedTodo;
        }),
      );
    }
  };

  const competedAll = () => {
    const everyCompletedTodos = todos.every(todo => todo.completed);
    let allTodos;

    if (everyCompletedTodos) {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    } else {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      });
    }

    setTodos(allTodos);
  };

  const hadleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoQuery.trim()) {
      return;
    }

    setTodos(prevTodos => {
      const newTodo = {
        id: +new Date(),
        title: todoQuery.trim(),
        completed: false,
      };

      return prevTodos
        ? [...prevTodos, newTodo]
        : [newTodo];
    });
    setTodoQuery('');
  };

  const visibleTodos = todos.filter(todo => {
    switch (pathname) {
      case SortBy.Active: {
        return !todo.completed;
      }

      case SortBy.Completed: {
        return todo.completed;
      }

      default:
        return true;
    }
  });

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={hadleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoQuery}
            onChange={(event) => {
              setTodoQuery(event.target.value);
            }}
          />
        </form>
      </header>
      {visibleTodos
      && (
        <TodoList
          onTodoDeleted={deleteTodos}
          onTodoUpdate={updateTodos}
          setComletedTodos={competedAll}
          todos={visibleTodos}
          completedTodos={completedTodos}
        />
      )}

      {todos && todos?.length > 0
      && (
        <TodosFilter
          completedTodos={completedTodos}
          onTodoDeleted={deleteTodos}
          todos={todos}
        />
      )}
    </>
  );
};
