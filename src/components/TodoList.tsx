/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import React from 'react';
import { TodoItem } from './TodoItem';

interface Props {
  visibleTodos: Todo[];
  onDeleteTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ visibleTodos, onDeleteTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </section>
  );
};
