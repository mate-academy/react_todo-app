import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Todo } from '../types/todo';
import { TodoList } from './TodoList';

type Props = {
  todos: Todo[]
  setTodos: (todo: Todo[]) => void
  deleteTodo: (id: string) => void
  toggleTodoStatus: (id: string) => void
};

export const MainSection: React.FC<Props> = ({
  todos,
  deleteTodo,
  toggleTodoStatus,
  setTodos,
}) => {
  return (
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
  );
};
