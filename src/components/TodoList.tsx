import React from 'react';
import { TodoItems } from './TodoItems';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const Todolist: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo: Todo) => (
        <TodoItems
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
