/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './todoList/todoList';
import { Todo } from './types/todoType';
import { TodoContext } from './todoContext';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [itemLeft, setItemLeft] = useState(todos.filter(
    todo => !todo.completed,
  ).length);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const filteredTodo = todos.filter(todo => {
    if (selectedFilter === 'Completed') {
      return todo.completed;
    }

    if (selectedFilter === 'Active') {
      return !todo.completed;
    }

    return true;
  });

  const handleFilter = (query: string) => {
    setSelectedFilter(query);
  };

  const deleteTodo = (deleteId: number) => {
    const todoForDeletion = todos.filter(todo => todo.id === deleteId);

    if (todoForDeletion[0].completed) {
      return setTodos(todos.filter(todo => todo.id !== deleteId));
    }

    setItemLeft(itemLeft - 1);

    return setTodos(todos.filter(todo => todo.id !== deleteId));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title) {
      setItemLeft(itemLeft + 1);
      const id = (+new Date());

      const newTodo: Todo = {
        id,
        title,
        completed: false,
      };

      addTodo(newTodo);
      setTitle('');
    }
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    if (areAllCompleted) {
      setItemLeft(todos.length);
    } else {
      setItemLeft(0);
    }

    setTodos(updatedTodos);
  };

  const handleClear = () => {
    const updatingTodos = todos.filter(todo => todo.completed === false);

    setTodos(updatingTodos);
    setItemLeft(updatingTodos.length);
  };

  const value = {
    filteredTodo,
    deleteTodo,
    setItemLeft,
    itemLeft,
  };

  return (
    <div className="todoapp">
      <TodoContext.Provider value={value}>
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleInput}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={handleToggleAll}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <TodoList />
        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {itemLeft}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: selectedFilter === 'All',
                })}
                onClick={() => {
                  handleFilter('All');
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: selectedFilter === 'Active',
                })}
                onClick={() => {
                  handleFilter('Active');
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: selectedFilter === 'Completed',
                })}
                onClick={() => {
                  handleFilter('Completed');
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={handleClear}
          >
            Clear completed
          </button>
        </footer>
      </TodoContext.Provider>
    </div>
  );
};
