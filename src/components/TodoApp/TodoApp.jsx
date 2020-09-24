import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [allCompleted, setAllcompleted] = useState(false);
  const FILTERS = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };
  const [filter, setFilter] = useState(FILTERS.all);
  const uncompletedTodos = todos.filter(todo => !todo.completed);

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

  const todoAddition = (event) => {
    if (!todoTitle) {
      return;
    }

    setTodos(prevTodos => [...prevTodos,
      {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      },
    ]);
    setTodoTitle('');
  };

  const checkAllCompleted = () => {
    setAllcompleted(!allCompleted);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    })));
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoApp">
      <header className="header">
        <h1>My todos:</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          todoAddition(event);
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={({ target }) => setTodoTitle(target.value.trimLeft())}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={false}
          onChange={() => checkAllCompleted()}
        />
        <label htmlFor="toggle-all">Mark all as completed</label>
        <TodoList todos={filteredTodos} setTodos={setTodos} />
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {uncompletedTodos.length}
            {uncompletedTodos.length > 1 ? ' items ' : ' item '}
            left
          </span>
          <TodosFilter
            filter={filter}
            setFilter={setFilter}
            FILTERS={FILTERS}
          />
          <button
            type="button"
            className="clear-completed"
            onClick={() => deleteCompleted()}
          >
            Clear completed
          </button>
        </footer>
      )}
    </section>
  );
};
