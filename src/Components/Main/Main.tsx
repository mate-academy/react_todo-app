import React, { useContext } from 'react';
import { DispatchContext, TodoContext } from '../../Data/Store';
import { Todo } from '../../Types/Todo';
import { TodoList } from '../TodoList/TodoList';

export const Main: React.FC = () => {
  const {
    todos,
    todosCompleted,
    filterActive,
    selectedCompleted,
  } = useContext(TodoContext);

  const dispatch = useContext(DispatchContext);

  const handleChange = () => {
    dispatch({ type: 'toggleCompleted' });

    if (!todosCompleted) {
      dispatch({ type: 'changeTotoCompletedTrue' });
    }

    if (todosCompleted) {
      dispatch({ type: 'changeTodoCompletedFalse' });
    }
  };

  
  const filterTodos = (todoItems: Todo[]) => {
    if (filterActive) {
      const activeTodos = todoItems.filter(todo => todo.completed === false);

      return activeTodos;
    }

    if (selectedCompleted) {
      const completedTodos = todoItems.filter(todo => todo.completed === true);

      return completedTodos;
    }

    return todoItems;
  };

  return (
    <section className="main">
      <input
        onChange={handleChange}
        checked={todosCompleted}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList
        items={filterTodos(todos)}
      />
    </section>
  );
};
