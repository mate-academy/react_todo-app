import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../../context/TodoContext';
import { FilterType } from '../../types/FilterType';

export const Main: React.FC = () => {
  const { todos, filterBy } = useContext(TodoContext);

  const visibleTodos = React.useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        case FilterType.All:
        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
