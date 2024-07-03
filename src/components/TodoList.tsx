import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (updatedTodo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onDelete, onUpdate }) => {
  const filteredTodos: Todo[] = todos.filter(t => {
    switch (t.filter) {
      case 'filterActive':
        return !t.completed;
      case 'filterCompleted':
        return t.completed;
      case 'filterAll':
        return t;
      default:
        return t;
    }
  });

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map((todo: Todo) => (
          <TodoItem
            todo={todo}
            onCheckedChange={onUpdate}
            onDeleteTodo={onDelete}
            onTextUpdate={onUpdate}
            key={todo.id}
          />
        ))}
      </section>
    </>
  );
};
