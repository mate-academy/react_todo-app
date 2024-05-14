import React from 'react';
import { Todo } from '../../components/ToDo/ToDo';
import { TodoType } from '../../types/types';

type Props = {
  visibleTodos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {visibleTodos.map((todo: TodoType) => (
      <Todo key={todo.id} todo={todo} />
    ))}
  </section>
);
