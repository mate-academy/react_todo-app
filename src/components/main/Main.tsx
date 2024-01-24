import { useContext } from 'react';
import './main.css';

import { TodoList } from '../todoList';
import { TodosContext } from '../../context/TodosContext';

export const Main: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={todos} />
    </section>
  );
};
