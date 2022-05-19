import React from 'react';
import { ToggleAll } from '../ToggleAll';
import { TodoList } from '../TodoList';

export const SectionMain: React.FC = () => {
  return (
    <section className="main">
      <ToggleAll />
      <TodoList />
    </section>
  );
};
