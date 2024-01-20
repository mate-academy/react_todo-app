import React, { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodosContext } from '../../contexts/TodosContext';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const { setTodos } = useContext(TodosContext);

  const handleCompleteAllTodo = () => {
    setTodos(prevTodos => prevTodos.map(
      (task) => ({ ...task, completed: !task.completed }),
    ));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleCompleteAllTodo}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
