import React from 'react';

import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoHeader } from './components/TodoHeader';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoAddition } from './components/TodoAddition';

import { TodosProvider } from './components/hoc/TodosProvider';

export const App: React.FC = () => (
  <TodosProvider>
    <div className="app">
      <TodoHeader />
      <div className="app__todos">
        <TodoForm />
        <TodoList />
        <TodoAddition />
      </div>
    </div>
  </TodosProvider>
);

export default App;
