import React, { useContext } from 'react';

import { TodoContext } from '../context/TodoContext';
import type { TodoContextType } from '../types/types';
import { TodoCard } from './TodoCard';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext<TodoContextType>(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
