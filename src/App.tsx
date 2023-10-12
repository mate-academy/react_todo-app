import React, { useContext } from 'react';
import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { MainComponent } from './components/MainComponent';
import { AppContext } from './context';

export const App: React.FC = () => {
  const { state } = useContext(AppContext);
  const { todos } = state;

  localStorage.setItem('todos', JSON.stringify(todos));

  return (
    <div className="todoapp">
      <HeaderComponent />
      <MainComponent />
      {state.todos.length !== 0 && (
        <FooterComponent />
      )}
    </div>
  );
};
