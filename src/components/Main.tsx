import React, { useCallback, useContext } from 'react';
import { TodosContext } from '../providers/TodosProvider';
import { TodoList } from './TodoList';
import { Status, StatusContext } from '../providers/StatusProvider';

type Props = {};

export const Main: React.FC<Props> = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);
  const { selectedStatus } = useContext(StatusContext);

  const filteredTodos = todos.filter(todo => {
    if (selectedStatus === Status.Active) {
      return !todo.completed;
    }

    if (selectedStatus === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  const allTodosCompleted = todos.every(todo => todo.completed);

  const onToggleClick = useCallback(() => {
    setTodos(prevTodos => {
      if (!allTodosCompleted) {
        return prevTodos.map(todo => ({
          ...todo,
          completed: true,
        }));
      }

      return prevTodos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    });
  }, [setTodos, allTodosCompleted]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={onToggleClick}
        checked={allTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList
        todos={filteredTodos}
      />
    </section>
  );
});
