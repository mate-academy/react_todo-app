import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  visibleTodos: Todo[];
  onTodoComplete: (todoId: number) => void;
  onTodoDestroy: (todoId: number) => void;
  onTodoEdit: (todoId: number, title: string) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  onTodoComplete,
  onTodoDestroy,
  onTodoEdit,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoComplete={onTodoComplete}
          onTodoDestroy={onTodoDestroy}
          onTodoEdit={onTodoEdit}
        />
      ))}

    </ul>
  );
};
