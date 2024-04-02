/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import { NavBar } from './components/NavBar';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="panel is-primary">
      <TodosProvider>
        <TodoInput />

        <NavBar />

        <TodoItem />
      </TodosProvider>
    </div>
  );
};
