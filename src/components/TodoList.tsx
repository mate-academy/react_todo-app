import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { PayloadProps } from '../types/PayloadProps';

interface Props {
  visibleTodos: Todo[];
  removeTodo: (id: number) => void;
  updateTodo: (id: number, payload: PayloadProps) => Promise<void>;
  loadingIds: number[];
}

export const TodoList: FC<Props> = ({
  visibleTodos,
  removeTodo,
  updateTodo,
  loadingIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          loadingIds={loadingIds}
          key={todo.id}
        />
      ))}
    </section>
  );
};
