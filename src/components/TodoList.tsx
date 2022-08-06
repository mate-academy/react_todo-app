import { Todo } from '../App';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  filteredTodos: Todo[],
  onSettingTodo: (totos: any) => void;
};

export const TodoList: React.FC<Props> = ({ todos, filteredTodos, onSettingTodo }) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            todo={todo}
            todos={todos}
            onSettingTodo={onSettingTodo}
          />
        ))}
      </ul>
    </>
  );
};
