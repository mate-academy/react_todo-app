/* eslint-disable no-console */
import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [todoQuery, setTodoQuery] = useState('');
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const visibleTodos = todos;
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
          todos={visibleTodos}
          completedTodos={completedTodos}
        />
      )}

      {visibleTodos && visibleTodos?.length > 0
      && (
        <TodosFilter
          completedTodos={completedTodos}
          todos={visibleTodos}
          onTodoDeleted={deleteTodos}
        />
      )}
    </>
  );
};
