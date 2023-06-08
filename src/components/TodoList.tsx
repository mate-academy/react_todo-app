import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggleCompleted: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onEditTodo: (id: number, newTitle: string) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onToggleCompleted,
  onRemoveTodo,
  onEditTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleCompleted={onToggleCompleted}
          onRemoveTodo={onRemoveTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
};
