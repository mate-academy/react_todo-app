import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  onDelete: (todoId: number) => void,
  onEdit: (todoId: number, todoTitle: string) => void,
  onChangeStatus: (todoId: number, todoStatus: boolean) => void,
};

export const TodoList: FC<Props> = ({
  todos,
  onDelete,
  onEdit,
  onChangeStatus,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeStatus={onChangeStatus}
          />
        );
      })}
    </ul>
  );
};
