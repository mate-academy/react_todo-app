import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoCompletion: (todoId: number) => void,
  onTodoRemoving: (todoId: number) => void,
  onTodoEditing: (todoId: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoCompletion,
  onTodoRemoving,
  onTodoEditing,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onTodoCompletion={onTodoCompletion}
          onTodoRemoving={onTodoRemoving}
          onTodoEditing={onTodoEditing}
        />
      ))}
    </ul>
  );
};
