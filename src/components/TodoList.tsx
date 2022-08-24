import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  onSetTodos: (value: Todo[]) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  onSetTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          todo={todo}
          onSetTodos={onSetTodos}
        />
      ))}
    </ul>
  );
};
