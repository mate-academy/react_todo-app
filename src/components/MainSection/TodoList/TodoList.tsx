import React from 'react';
import { TodoItem } from './TodoItem/TodoItem';
import { Todo } from '../../../types/Todo';

interface TodoListProps {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ visibleTodos }) => {
  return (
    <>
      <TodoItem visibleTodos={visibleTodos} />
    </>
  );
};
