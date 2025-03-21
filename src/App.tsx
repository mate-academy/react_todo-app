/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Title from './components/Title';

// localStorage.clear()

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Title />

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
};
