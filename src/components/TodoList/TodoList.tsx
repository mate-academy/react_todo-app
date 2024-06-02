/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import React from 'react';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo, newTitle: string) => void;
  toggleById: (todo: Todo, newIsCompleted: boolean) => void;
  beingUpdated: number | null;
  loadingTodos: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onUpdate,
  toggleById,
  beingUpdated,
  loadingTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onDelete={onDelete}
          key={todo.id}
          onUpdate={onUpdate}
          toggleById={toggleById}
          beingUpdated={beingUpdated}
          loadingTodos={loadingTodos.includes(todo.id)}
        />
      ))}
    </section>
  );
};
