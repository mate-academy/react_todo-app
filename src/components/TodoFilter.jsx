import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import TodosList from './TodosList';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

const TodoFilter = () => {
  const { todos } = useSelector(state => state.todos);

  return (
    <Routes>
      <Route path="/" element={<TodosList todos={todos} />} />
      <Route path={FILTERS.all} element={<Navigate to="/" />} />
      <Route
        path={FILTERS.active}
        element={<TodosList todos={todos.filter(todo => !todo.completed)} />}
      />
      <Route
        path={FILTERS.completed}
        element={<TodosList todos={todos.filter(todo => todo.completed)} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default TodoFilter;
