/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

const sTodos: Todo[] = [
  {
    id: 1,
    title: '1 todo',
    completed: false,
  },
  {
    id: 2,
    title: '2 todo',
    completed: false,
  },
  {
    id: 3,
    title: '3 todo',
    completed: false,
  },
  {
    id: 4,
    title: '4 todo',
    completed: false,
  },
];

function prepareTodos(todos: Todo[]): Todo[] {
  const todosCopy = [...todos];

  return todosCopy;
}

export const App: React.FC = () => {
  const todos = prepareTodos(sTodos);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      <TodoList items={todos} />

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
