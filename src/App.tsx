import React, { useContext } from 'react';
import { TodoForm } from './components/TodoForm';
import { StateContext } from './components/Store';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Layout } from './components/Layout';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const hasTodos = todos.length > 0;

  return (
    <Layout>
      <TodoForm />

      {hasTodos && (
        <TodoList />
      )}

      { hasTodos && (
        <TodoFilter />
      )}
    </Layout>
  );
};
