/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodolistProps {
  filteredTodos: Todo[];
  deleteTodo: (todoId: number) => void;
}

export const TodoList: React.FC<TodolistProps> = React.memo(
  ({ filteredTodos, deleteTodo }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
