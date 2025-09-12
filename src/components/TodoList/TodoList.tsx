import React, { useContext, useMemo } from 'react';
import { TodoContext } from '../Context';
import { FilterType } from '../../types/FilterType';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterType } = useContext(TodoContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.ALL:
          return true;

        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;
      }
    });
  }, [filterType, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
