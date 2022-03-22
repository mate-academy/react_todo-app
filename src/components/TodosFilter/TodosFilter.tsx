import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import TodoList from '../TodoList';

import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodosFilter: React.FC<Props> = React.memo(({ todos, setTodos }) => (
  <Routes>
    <Route path="/" element={<TodoList todos={todos} setTodos={setTodos} />} />
    <Route path={Status.All} element={<Navigate to="/" />} />
    <Route
      path={Status.Active}
      element={(
        <TodoList
          todos={todos.filter(todo => !todo.completed)}
          setTodos={setTodos}
        />
      )}
    />
    <Route
      path={Status.Completed}
      element={(
        <TodoList
          todos={todos.filter(todo => todo.completed)}
          setTodos={setTodos}
        />
      )}
    />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
));
