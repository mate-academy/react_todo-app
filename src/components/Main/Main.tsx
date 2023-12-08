import React from 'react';

import './Main.scss';
import TodoList from '../TodoList';
import ToggleAll from '../ToggleAll';

const Main: React.FC = () => {
  return (
    <section className="main">
      <ToggleAll />

      <TodoList />
    </section>
  );
};

export default Main;
