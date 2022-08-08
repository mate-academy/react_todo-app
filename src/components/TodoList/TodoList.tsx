import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  onUpdateStatus: (id: number, isCompleted: boolean) => void,
  onDelete: (id: number) => void,
  onUpdateTitle: (id: number, title: string) => void,
};

export const TodoList: FC<Props> = ({
  todos,
  onDelete,
  onUpdateStatus,
  onUpdateTitle,
}) => {
  const doubleClickHandler = (
    event: React.MouseEvent<HTMLLabelElement>,
  ): boolean => {
    return event.detail === 2;
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDelete={onDelete}
            onDoubleClick={doubleClickHandler}
            onUpdateTitle={onUpdateTitle}
            onUpdateStatus={onUpdateStatus}
          />
        );
      })}
    </ul>
  );
};
