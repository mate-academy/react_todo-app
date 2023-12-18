import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { TodoList } from './TodoList';

type PropsMain = {
};

export const Main: React.FC<PropsMain> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const changeAllDone = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updetedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updetedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={changeAllDone}
        checked={todos.every(todo => todo.completed)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
