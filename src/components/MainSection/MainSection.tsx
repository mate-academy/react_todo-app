import React from 'react';
import { TodoList } from './TodoList/TodoList';
import { Todo } from '../../types/Todo';

interface MainSectionProps {
  visibleTodos: Todo[];
}

export const MainSection: React.FC<MainSectionProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList visibleTodos={visibleTodos} />
    </section>
  );
};
