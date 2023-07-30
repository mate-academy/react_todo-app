import React from 'react';
import { Todo } from '../utils/utils';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  onTitleUpdate: (todo: Todo, newTitle: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onComplete,
  onTitleUpdate,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.length > 0 && todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onComplete={onComplete}
          onTitleUpdate={onTitleUpdate}
        />
      ))}
    </ul>
  );
};
