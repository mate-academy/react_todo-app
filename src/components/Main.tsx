import React from 'react';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { filteredTodos } from '../utils/filteredTodos';
import { TodoFromList } from './TodoFromList';

export const Main: React.FC = () => {
  const { todos, filterActions } = useGlobalState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        filteredTodos(todos, filterActions).map(todo => (
          <TodoFromList key={todo.id} todo={todo} />
        ))}
    </section>
  );
};
