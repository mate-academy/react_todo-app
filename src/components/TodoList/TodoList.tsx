import { TodoItem } from '../TodoItem';
import { Todo, PatchedTodo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onChangeIsError: (e: Errors) => void
  onDelete: (id: number) => void
  onChangeTodo: (id: number, data: PatchedTodo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onChangeIsError,
  tempTodo,
  onDelete,
  onChangeTodo,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onChangeIsError={onChangeIsError}
          onDeleteTodo={() => onDelete(todo.id)}
          onChangeTodo={onChangeTodo}
        />
      ))}

      {tempTodo && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          onChangeIsError={onChangeIsError}
          onDeleteTodo={() => onDelete(tempTodo.id)}
          onChangeTodo={onChangeTodo}
        />
      )}
    </div>
  );
};
