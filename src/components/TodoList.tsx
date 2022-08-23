import { Todo } from '../types/types';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  filteredTodos: Todo[],
  onSettingTodo: (totos: Todo[]) => void;
  onUpdate: (id: number, str: string) => void,
  onToggle: () => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  filteredTodos,
  onSettingTodo,
  onUpdate,
  onToggle,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={onToggle}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            todo={todo}
            todos={todos}
            key={todo.id}
            onSettingTodo={onSettingTodo}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </>
  );
};
