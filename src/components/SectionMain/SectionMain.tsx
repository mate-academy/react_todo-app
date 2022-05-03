import React, { useContext } from 'react';
import { ToggleAll } from '../ToggleAll';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext';

export const SectionMain: React.FC = () => {
  const { todos } = useContext(TodosContext);

  if (todos.length) {
    return (
      <section className="main">
        <ToggleAll />
        <TodoList />
      </section>
    );
  }

  return null;
};
