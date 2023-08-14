import React, { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { DispatchContext, TodosContext } from '../../Store';
import { Todo } from '../../Types/Todo';

export const Main: React.FC = () => {
  const {
    todos,
    todosCompleted,
    showActiveTodos,
    selectedCompleted,
  } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const handleChange = () => {
    dispatch({ type: 'toggleTodosCompleted' });

    if (!todosCompleted) {
      dispatch({ type: 'changeTodosCompletedTrue' });
    }

    if (todosCompleted) {
      dispatch({ type: 'changeTodosCompletedFalse' });
    }
  };

  const filterTodos = (items: Todo[]) => {
    if (showActiveTodos) {
      const activeTodos = items.filter(todo => todo.completed === false);

      return activeTodos;
    }

    if (selectedCompleted) {
      const completedTodos = items.filter(todo => todo.completed === true);

      return completedTodos;
    }

    return items;
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todosCompleted}
        onChange={handleChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filterTodos(todos)} />
    </section>
  );
};
