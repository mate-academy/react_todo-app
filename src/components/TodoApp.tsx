import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleStorage } from './hooks/useLocaleStorage';
import { Todo } from '../types/Todo';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const isCompleted = todos.every(todo => todo.completed);
  const [areCompleted, setCompleted] = useState(isCompleted);

  const location = useLocation();
  const path = location.pathname;

  const visibleTodos = todos.filter(todo => {
    switch (path) {
      case '/completed':
        return todo.completed;

      case '/active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  const counter = todos.reduce((prev, cur) => prev + Number(cur.completed), 0);

  const handleClick = () => setTodos(todos.filter(todo => !todo.completed));

  const handleCheck = () => {
    let todosList = [];

    if (areCompleted) {
      todosList = todos.map(todo => {
        return { ...todo, completed: false };
      });
      setCompleted(false);
    } else {
      todosList = todos.map(todo => {
        return { ...todo, completed: true };
      });
      setCompleted(true);
    }

    setTodos(todosList);
  };

  return (
    <div className="todoapp">
      <section className="header">
        <h1>Todos</h1>

        <AddTodo todos={todos} onSetTodos={setTodos} />
      </section>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={areCompleted}
          onChange={handleCheck}

        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          onSetTodos={setTodos}
          onCheck={setCompleted}
        />

      </section>

      <section className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${counter} items left`}
        </span>

        <TodoFilter path={path} />

        {counter > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClick}
          >
            Clear completed
          </button>
        )}
      </section>
    </div>
  );
};
