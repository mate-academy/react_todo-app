import React, { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { FILTERS } from './constants';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const [filter, setFilter] = useState(FILTERS.all);
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FILTERS.completed:
        return todo.completed;

      case FILTERS.active:
        return !todo.completed;

      default:
        return todo;
    }
  });

  const changeAll = (event) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    })));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      setTodos([
        ...todos,
        {
          title: todoTitle,
          id: +new Date(),
          completed: false,
        },
      ]);
      setTodoTitle('');
    } else {
      setTodoTitle('');
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={({ target }) => setTodoTitle(target.value)}
          />
        </form>
      </header>
      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed) && todos.length > 0}
            onChange={changeAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={filteredTodos}
            setTodos={setTodos}
          />
        </section>
      )}
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {`${uncompletedTodos.length} items left`}
          </span>

          <TodosFilter
            filter={filter}
            setFilter={setFilter}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => setTodos(uncompletedTodos)}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
