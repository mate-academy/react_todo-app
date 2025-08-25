import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  editingTodoId: number | null;
  onEdit: (todoId: number | null) => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  onRemove: (todoId: number) => void;
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
