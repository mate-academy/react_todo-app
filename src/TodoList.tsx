import { Todo } from './type';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  onRemove: (todoId: number) => void,
  onChangeStatus: (todo: Todo) => void,
  onChangeTitle: (todo: Todo, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onRemove,
  onChangeStatus,
  onChangeTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          onRemove={onRemove}
          onChangeStatus={onChangeStatus}
          onChangeTitle={onChangeTitle}
        />
      ))}
    </ul>
  );
};
