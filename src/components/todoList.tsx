import React from 'react';

import type { Todo as TodoType } from '../App';
import { Todo } from './TodoItem';

interface TodoListProps {
  todos: TodoType[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
