import type { FC } from 'react';

import type { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onDelete: (todoId: number) => void;
}

export const TodoList: FC<Props> = ({ todos, onDelete }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
    ))}
  </section>
);
