/* eslinewTodoTitlent-disable @typescript-eslint/indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(`${localStorage.getItem('todos')}`) || []);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const makeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const makeTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const validTodoTitle = newTodoTitle.trim();

    if (validTodoTitle) {
      const newTodoObj = {
        id: Math.random().toString(36).slice(2, 7),
        title: validTodoTitle,
        completed: false,
      };

      setTodos([...todos, newTodoObj]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodoObj]));
      setNewTodoTitle('');
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleTodoStatus = (id: string) => {
    let updatedTodos;

    if (id === 'toggleAll') {
      if (todos.some(todo => todo.completed === false)) {
        updatedTodos = todos.map(
          todo => ({ ...todo, completed: true }),
        );
      } else {
        updatedTodos = todos.map(
          todo => ({ ...todo, completed: false }),
        );
      }
    } else {
      updatedTodos = todos.map(todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo));
    }

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(e) => makeTodo(e)}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => makeTodoTitle(event)}
            value={newTodoTitle}
          />
        </form>
      </header>

      <section className="main">
        {todos[0] && (
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => toggleTodoStatus('toggleAll')}
          />
        )}
        <label htmlFor="toggle-all"> </label>
        <Routes>
          <Route
            path="/"
            element={(
              <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                toggleTodoStatus={toggleTodoStatus}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path="active"
            element={(
              <TodoList
                todos={todos.filter(todo => todo.completed === false)}
                deleteTodo={deleteTodo}
                toggleTodoStatus={toggleTodoStatus}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path="completed"
            element={(
              <TodoList
                todos={todos.filter(todo => todo.completed === true)}
                deleteTodo={deleteTodo}
                toggleTodoStatus={toggleTodoStatus}
                setTodos={setTodos}
              />
            )}
          />

        </Routes>
      </section>
      {todos.length
        ? (<Footer todos={todos} setTodos={setTodos} />)
        : ''}
    </div>
  );
};
