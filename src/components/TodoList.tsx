import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  onDeleteTodo(id: number): void,
  onToggle(id: number): void,
  onRenameTodo(id: number, str: string): void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDeleteTodo,
  onToggle,
  onRenameTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggle={onToggle}
          onRenameTodo={onRenameTodo}
        />
      ))}
    </ul>
  );
};
