/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { Todo } from './react-app-env';
import { useLocalStorage } from './useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoTitle, setTodoTitle] = useState('');

  const checkAllTodosCompleted = todos.length === todos.filter(
    todo => todo.completed,
  ).length && !!todos.length;

  const changeAllTodosCompleted = () => {
    if (todos.length === todos.filter(todo => todo.completed).length) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    }
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      setTodos(
        [...todos, {
          id: +new Date(),
          title: todoTitle.trim(),
          completed: false,
        }],
      );
      setTodoTitle('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={submitForm}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={checkAllTodosCompleted}
          onChange={changeAllTodosCompleted}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={todos} setTodos={setTodos} />
      </section>

      {todos.length > 0 && <TodosFilter todos={todos} setTodos={setTodos} />}
    </div>
  );
};
