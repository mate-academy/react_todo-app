import React from 'react';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { getFilteredTodos } from '../utils/getFilteredTodos';
import { TodoFormList } from './TodoFormList';

export const Main: React.FC = () => {
  const { todos, filterActions } = useGlobalState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {getFilteredTodos(todos, filterActions).map(todo => (
        <TodoFormList key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
