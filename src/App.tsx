import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TodoPage } from './features/TodoPage';
import { fetchTodos } from './features/TodoPage/todoPageSlice';
import { useAppDispatch } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<TodoPage />}
        />

        <Route
          path=":status"
          element={<TodoPage />}
        />
      </Route>
    </Routes>
  );
};
