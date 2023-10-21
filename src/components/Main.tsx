import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext, TodosContext } from '../TodosContext';
import { Todo } from './Types/Todo';

export const Main: React.FC = () => {
  const {
    todos,
    todosCompleted,
    selectedActive,
    selectedCompleted,
  } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const handleChange = () => {
    dispatch({ type: 'todosCompleted' });

    if (!todosCompleted) {
      dispatch({ type: 'changeTodosCompletedTrue' });
    }

    if (todosCompleted) {
      dispatch({ type: 'changeTodosCompletedFalse' });
    }
  };

  const filterTodos = (items: Todo[]) => {
    if (selectedActive) {
      const activeTodos = items.filter(todo => todo.completed === false);

      return activeTodos;
    }

    if (selectedCompleted) {
      const activeTodos = items.filter(todo => todo.completed === true);

      return activeTodos;
    }

    return items;
  };

  return (
    <section className="main">
      <input
        checked={todosCompleted}
        onChange={handleChange}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filterTodos(todos)} />
    </section>
  );
};
