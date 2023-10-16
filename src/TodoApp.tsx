/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/LocalStorage';
import { TodosContext } from './hooks/TodosContext';
import { TodosFilter } from './components/TodosFilter';

export const TodoApp: React.FC = () => {
  const [storageTodos, setStorageTodos] = useLocalStorage();
  const [todos, setTodos] = useState<Todo[]>(storageTodos);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const activesCount = activeTodos.length;
  const activesText = `${activesCount} item${activesCount === 1 ? '' : 's'} left`;
  const allCompleted = completedTodos.length === todos.length;

  const setNewTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);

    return newTodos;
  };

  const handleNewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoInput = inputRef.current;
    const todoTitle = todoInput?.value.trim();

    if (todoInput && todoTitle) {
      const newTodo: Todo = {
        id: +new Date(),
        completed: false,
        title: todoTitle,
      };
      const newTodos = [...todos, newTodo];

      setTodos(newTodos);
      setStorageTodos(newTodos);
      todoInput.value = '';
    }
  };

  const handleChange = () => {
    const newTodos = todos.map(todo => {
      const todoCopy = { ...todo };

      todoCopy.completed
      = todos.length !== todos.filter(t => t.completed).length;

      return todoCopy;
    });

    setTodos(newTodos);
    setStorageTodos(newTodos);
  };

  const handleClick = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
    setStorageTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleNewSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            ref={inputRef}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleChange}
              checked={allCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodosContext.Provider value={{ todos, setNewTodos }}>
              <Routes>
                <Route path="/" element={<TodoList items={todos} />} />
                <Route
                  path="active"
                  element={<TodoList items={activeTodos} />}
                />
                <Route
                  path="completed"
                  element={<TodoList items={completedTodos} />}
                />
              </Routes>
            </TodosContext.Provider>
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {activesText}
            </span>

            <TodosFilter />

            {!!completedTodos.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClick}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
