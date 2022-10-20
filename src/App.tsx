/* eslint-disable jsx-a11y/control-has-associated-label */
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { StylesExample } from './components/StylesExample';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFound';
import { LocalTodos } from './components/LocalTodos';
import { CloudTodos } from './components/CloudTodos';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="block">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/styles" element={<StylesExample />} />
              <Route path="/local" element={<LocalTodos />} />
              <Route path="/local/active" element={<LocalTodos />} />
              <Route path="/local/completed" element={<LocalTodos />} />
              <Route path="/cloud" element={<CloudTodos />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};
