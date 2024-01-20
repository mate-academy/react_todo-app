import React from 'react';
// import { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
// import { TodosContext } from '../../contexts/TodosContext';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  // const lang = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
