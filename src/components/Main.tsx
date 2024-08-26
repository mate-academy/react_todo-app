import React from 'react';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { filteredTodos } from '../utils/filteredTodos';
import { TodoFormList } from './TodoFormList';

export const Main: React.FC = () => {
  const { todos, filterActions } = useGlobalState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos(todos, filterActions).map(todo => (
        <TodoFormList key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
