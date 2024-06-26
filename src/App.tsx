/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './styles/filter.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';
import 'classnames';

import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';
import { ToDoProvider } from './components/ToDoContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ToDoProvider>
          <Header />
          <ToDoList />
          <Footer />
        </ToDoProvider>
      </div>
    </div>
  );
};
