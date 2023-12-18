import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';

type Props = {
};

export const Main: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const changeAllDone = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updetedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updetedTodos);
  };

  const areAllTodosCompleted = (todosToCheck: Todo[]) => {
    return todosToCheck.every((todo) => todo.completed);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={changeAllDone}
        checked={areAllTodosCompleted(todos)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
