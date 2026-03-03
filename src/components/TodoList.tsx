import React, { useMemo } from 'react';
import { FilterStatus } from '../types/FilterStatus';
import { TodoItem } from './TodoItem';
import { useTodoState } from './TodoProvider';

type Props = {
  status: FilterStatus;
};

export const TodoList: React.FC<Props> = ({ status }) => {
  const { todos } = useTodoState();

  const visibleTodos = useMemo(() => {
    if (status === FilterStatus.Active) {
      return todos.filter(todo => !todo.completed);
    } else if (status === FilterStatus.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, status]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
