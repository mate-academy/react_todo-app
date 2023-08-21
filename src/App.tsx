/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState, useRef } from 'react';
import { Status, Todo } from './types';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState(Status.All);

  const completedTodos = todos.filter(todo => todo.completed);
  const areAllTodosCompleted = completedTodos.length === todos.length;
  const isAnyTodoCompleted = completedTodos.length !== 0;
  const notCompletedTodoCount = todos.length - completedTodos.length;

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    switch (activeFilter) {
      case Status.All:
        return true;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    inputRef.current?.focus();

    setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
    setActiveFilter(JSON.parse(
      localStorage.getItem('activeFilter') || `"${Status.All}"`,
    ));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('activeFilter', JSON.stringify(activeFilter));
  }, [activeFilter]);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const updateTodo = (updatedTodo: Todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

    newTodos.splice(index, 1, updatedTodo);

    setTodos(newTodos);
  };

  const deleteTodo = (deletedTodo: Todo) => {
    setTodos(todos.filter(todo => todo.id !== deletedTodo.id));
  };

  const toggleAllTodo = () => {
    setTodos(todos.map(todo => (
      { ...todo, completed: !areAllTodosCompleted }
    )));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <TodosContext.Provider value={{
        todos: filteredTodos,
        updateTodo,
        deleteTodo,
        activeFilter,
        setActiveFilter,
      }}
      >
        <header className="header">
          <h1>todos</h1>

          <form
            onSubmit={addTodo}
          >
            <input
              ref={inputRef}
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                checked={areAllTodosCompleted}
                onChange={() => toggleAllTodo()}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList />
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${notCompletedTodoCount} items left`}
              </span>

              <TodosFilter />

              {isAnyTodoCompleted && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => deleteCompletedTodos()}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </TodosContext.Provider>
    </div>
  );
};
