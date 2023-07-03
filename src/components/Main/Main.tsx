import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  onDelete: (todoId: number) => void,
  onUpdate: (id: number, data: Partial<Todo>) => void;
  tempTodo: Todo | null,
  loadedTodoIds: number[],
};

export const Main: React.FC<Props> = ({
  todos,
  onDelete,
  onUpdate,
  tempTodo,
  loadedTodoIds,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        loadedTodoIds={loadedTodoIds}
        onUpdate={onUpdate}
      />
    ))}

    {tempTodo && (
      <TodoItem
        todo={tempTodo}
        onUpdate={onUpdate}
        onDelete={onDelete}
        loadedTodoIds={loadedTodoIds}
      />
    )}
  </section>
);
