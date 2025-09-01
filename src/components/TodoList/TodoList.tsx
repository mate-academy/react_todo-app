import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  editingTodoId: Todo['id'] | null;
  onEdit: (todoId: Todo['id'] | null) => void;
  onUpdate: (id: Todo['id'], data: Partial<Todo>) => void;
  onRemove: (todoId: Todo['id']) => void;
}

const TodoListComponent: React.FC<Props> = ({
  todos,
  editingTodoId,
  onEdit,
  onUpdate,
  onRemove,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          editingTodoId={editingTodoId}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};

export const TodoList = React.memo(TodoListComponent);
