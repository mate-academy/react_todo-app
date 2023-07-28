import { useContext, useCallback } from 'react';
import { FilterContext, TodosContext, Status } from '../../store';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const { filter } = useContext(FilterContext);
  const todos = useContext(TodosContext);

  const getVisibleTodos = useCallback(() => {
    switch (filter) {
      case Status.All: {
        return todos;
      }

      case Status.Active: {
        return todos.filter(todo => todo.completed === false);
      }

      case Status.Completed: {
        return todos.filter(todo => todo.completed === true);
      }

      default: {
        return todos;
      }
    }
  }, [todos, filter]);

  const visibleTodos = getVisibleTodos();

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
