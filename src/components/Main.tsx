import React, { useContext } from 'react';
import { Todolist } from './TodoList';
import { TodosContext } from './TodosContext';
import { Todos } from '../types/todos';

type Props = {
  filteredTodos: Todos[];
};

export const Main: React.FC<Props> = ({ filteredTodos }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const areAllCompleted = todos.every(todo => todo.completed);

  const toggleAllTodos = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={areAllCompleted}
        onChange={toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <Todolist filteredTodos={filteredTodos} />
    </section>
  );
};
