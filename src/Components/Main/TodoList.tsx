import React from 'react';
import { Todo } from '../../Types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <>
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </>
  );
};
