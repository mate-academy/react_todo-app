import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TodoList } from '../TodoList';
import { TodosContext } from '../../TodosContext';

export const TodoPage: React.FC = () => {
  const todos = useContext(TodosContext)?.todos;

  return (
    <>
      {todos && (
        <Routes>
          <Route path="*" element={<TodoList todos={todos} />} />
          <Route path="/active" element={<TodoList todos={todos.filter(todo => !todo.completed)} />} />
          <Route path="/completed" element={<TodoList todos={todos.filter(todo => todo.completed)} />} />
        </Routes>
      )}
    </>
  );
};
